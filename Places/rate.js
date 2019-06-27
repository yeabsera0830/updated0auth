const Places = require('../model/Place')

function calculate(ratings) {
    var freq = ratings.length
    var sum = 0
    ratings.forEach(rating => {
        sum += rating.numberOfRatings
    })
    return {
        value: ( sum / freq ),
        numberOfRatings: freq
    }
}


async function rate(placeID, userID, rating) {
    if (placeID === null || typeof placeID != 'number') {
        return {
            status: 400,
            message: "Could not rate place"
        }
    }
    if (rating > 5 || rating < 0) {
        return {
            status: 400,
            message: "Could not rate place"
        }
    }

    const foundPlace = await Places.findOne({ placeID: placeID })
    if (foundPlace == null) {
        return {
            status: 400,
            message: "Could not rate place"
        }
    }
    
    var ratings = foundPlace.placeRatings
    var ratedBefore = false
    var i = 0
    var index
    ratings.forEach(item => {
        if (item.userID == userID) {
            ratedBefore = true
            index = i
        }
        ++i
    })

    if (ratedBefore) {
        ratings[index].numberOfRatings = rating
    } else {
        ratings.push({
            userID: userID,
            numberOfRatings: rating
        })
    }

    await Places.updateOne({ placeID: placeID }, { placeRatings: ratings, placeRating: calculate(ratings).value })
    return {
        status: 200,
        newRating: calculate(ratings)
    }
}

module.exports = rate