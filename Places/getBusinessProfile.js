const Place = require('../model/Place')
const getRatingFormat = require('./getRatingFormat')

async function getBusinessProfile(userID, numberOfPhotos, numberOfReviews, placeID) {
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
    placeReturned.name = place.placeName //
    placeReturned.price = place.placePrice //
    placeReturned.category = place.placeCategory
    placeReturned.openDays = place.placeOpenDays //
    placeReturned.openHours = place.placeOpenHours //
    placeReturned.overview = place.placeOverview //
    placeReturned.location = place.placeLocation //
    placeReturned.rating = place.placeRating //
    placeReturned.numberOfRatings = place.placeNumberOfRatings //
    placeReturned.profilePicture = place.placeProfilePicture //

    views = place.placeViews
    var found = views.find(view => view.viewer === userID)
    if (found == null) {
        views.push({
            viewer: userID,
            timestamp: new Date().getTime()
        })
    } else {
        for (let j = 0; j < views.length; ++j) {
            if (views[j].viewer == userID) {
                views[j].timestamp = new Date().getTime()
            }
        }
    }

    await Place.updateOne({ placeID: placeID }, { placeViews: views })

    if (place.placeReviews.length > numberOfReviews) {
        placeReturned.reviews = place.placeReviews.slice(0, numberOfReviews)
    } else if (numberOfReviews < 0) {
        placeReturned.reviews = place.placeReviews
    }
    else {
        placeReturned.reviews = place.placeReviews
    }
    
    if (place.placePhotos.length > numberOfPhotos) {
        placeReturned.photos = place.placePhotos.slice(0, numberOfPhotos)
    } else if (numberOfPhotos < 0) {
        placeReturned.photos = place.placePhotos
    } else {
        placeReturned.photos = place.placePhotos
    } 

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