const Place = require('../model/Place')
const connect = require('../config/auth').connect

async function getBusinessProfile(placeID) {
    await connect()
    await connect()
    placeID = parseInt(placeID)
    if (placeID === null || typeof placeID != 'number') {
        return {
            status: 400,
            message: "Please Insert an ID"
        }
    }
    place = await Place.findOne({ placeID: placeID })
    var placeReturned = {}
    placeReturned.placeID = place.placeID
    placeReturned.placeName = place.placeName
    placeReturned.placePrice = place.placePrice
    placeReturned.placeCategory = place.placeCategory
    placeReturned.placeOpenDays = place.placeOpenDays
    placeReturned.placeOpenHours = place.placeOpenHours
    placeReturned.placeType = place.placeType
    placeReturned.placeOverview = place.placeOverview
    placeReturned.placeLocation = place.placeLocation
    placeReturned.placeRating = place.placeRating
    placeReturned.placeNumberOfRatings = place.placeNumberOfRatings
    placeReturned.placeProfilePicture = place.placeProfilePicture
    placeReturned.placeReviews = place.placeReviews
    placeReturned.placePhotos = place.placePhotos
    placeReturned.placeOwner = place.placeOwner
    placeReturned.placeAddedOn = place.placeAddedOn
    placeReturned.placeAddedBy = place.placeAddedBy
    if (place != null) {
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

module.exports = getBusinessProfile