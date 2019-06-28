const Places = require('../model/Place')

function calculate(ratings) {
    var freq = ratings.length
    var sum = 0
    ratings.forEach(rating => {
        sum += rating.numberOfRatings
    })
    var average
    if (freq === 0) {
        average = 0
    } else {
        average = sum / freq
    }
    return {
        value: average,
        numberOfRatings: freq
    }
}


async function rate(placeID, userID, rating) {
    if (placeID == null) {
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
        if (rating == 0) {
            ratings.splice(index, 1)
        } else {
            ratings[index].numberOfRatings = rating
        }
    } else {
        if (rating != 0) {
            ratings.push({
                userID: userID,
                numberOfRatings: rating
            })
        }
    }
    console.log("HERE")

    await Places.updateOne({ placeID: placeID }, { placeRatings: ratings, placeRating: calculate(ratings).value }).then(res => res).catch(err => console.log(err))
    return {
        status: 200,
        newRating: calculate(ratings)
    }
}

module.exports = rate