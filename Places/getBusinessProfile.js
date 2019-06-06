const Place = require('../model/Place')
const connect = require('../config/auth').connect

async function getBusinessProfile(placeID) {
    if (placeID == null) {
        return {
            status: 400,
            message: "Please Insert an ID"
        }
    }
    placeID = parseInt(placeID)
    place = await Place.findOne({ placeID: placeID })
    if (place == null) {
        return {
            status: 400,
            message: "Could not find place"
        }
    }
    
    var placeReturned = {}
    placeReturned.id = place.placeID
    placeReturned.name = place.placeName
    if (place.placePrice >= 1 && place.placePrice <= 3) {
        placeReturned.price = 1
    } else if (place.placePrice >= 4 && place.placePrice <= 6) {
        placeReturned.price = 2
    } else {
        placeReturned.price = 0
    }
    
    placeReturned.category = place.placeCategory
    placeReturned.openDays = place.placeOpenDays
    placeReturned.openHours = place.placeOpenHours
    placeReturned.overview = place.placeOverview
    placeReturned.location = place.placeLocation
    placeReturned.rating = place.placeRatings
    placeReturned.numberOfRatings = place.placeNumberOfRatings
    placeReturned.profilePicture = place.placeProfilePicture
    placeReturned.reviews = place.placeReviews
    placeReturned.photos = place.placePhotos
    placeReturned.owner = place.placeOwner
    placeReturned.addedOn = place.placeAddedOn
    placeReturned.addedBy = place.placeAddedBy
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