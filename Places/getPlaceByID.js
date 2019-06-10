const Place = require('../model/Place')
const checkZeilaToken = require('./checkUser')
const connect = require('../config/auth').connect
const getLocation = require('../Places/getReadableAddress').getAddress
connect()

async function getPlaceByID(accessToken, placeID) {
    const check = await checkZeilaToken(accessToken)
    if (check) {
        return {
            status: 400,
            message: "Unable to get place"
        }
    }

    if (placeID === null) {
        return {
            status: 400,
            message: "Please Insert an ID"
        }
    }

    const placeReturned = {}
    const place = await Place.findOne({ placeID: placeID })
    if (place != null) {
        const location = await getLocation(place.placeLocation.latitude, place.placeLocation.longitude)
        placeReturned.name = place.placeName
        placeReturned.overview = place.placeType
        placeReturned.location = {
            latitude: place.placeLocation.latitude,
            longitude: place.placeLocation.longitude
        }
        placeReturned.address = {
            minor: location.address.minor,
            major: location.address.major
        }
        placeReturned.image = place.placeProfilePicture
        placeReturned.rating = place.placeRating
        placeReturned.numberOfRatings = place.placeNumberOfRating
        placeReturned.numberOfReviews = 0
        placeReturned.bookmarked = false
        return {
            status: 200,
            profile: placeReturned
        }
    } else {
        return {
            status: 400,
            message: "Could Not Find Place"
        }
    }
}

module.exports = getPlaceByID