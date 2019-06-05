const Places = require('../model/Place')

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
    var numberOfRatings = foundPlace.placeNumberOfRatings
    const userRatings = ratings.find(ratings => ratings.userID === userID)
    if (userRatings == null) {
        if (rating === 0) {
            return {
                status: 200,
                newRating: rating
            }
        }
        ratings[ratings.length] = {
            userID: userID,
            numberOfRatings: rating
        }
        numberOfRatings++
        await Places.updateOne({ placeID: placeID }, { placeRatings: ratings, placeNumberOfRatings: numberOfRatings })
    } else {
        for (let i = 0; i < ratings.length; ++i) {
            if (ratings[i].userID === userID) {
                if (rating === 0) {
                    ratings.splice(i, 1)
                    numberOfRatings--
                    await Places.updateOne({ placeID: placeID }, { placeRatings: ratings, placeNumberOfRatings: numberOfRatings})
                    break
                } else {
                    ratings[i].numberOfRatings = rating
                    await Places.updateOne({ placeID: placeID }, { placeRatings: ratings})
                }
            }
        }
    }

    console.log(ratings)

    return {
        status: 200,
        newRating: rating
    }
}

module.exports = rate