const Place = require('../model/Place')

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
    placeReturned.price = place.placePrice
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