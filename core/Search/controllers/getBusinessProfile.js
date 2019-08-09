const Place = require('../../../model/Place')
const User = require('../../../model/User')
const Review = require('../../../model/Review')
const getReadableAddress = require('../../Address/controllers/getReadableAddress')

async function getRating(userID, placeID) {
    const found = await Place.findOne({ placeID })
    const ratings = found.placeRatings
    var returned = 0
    ratings.forEach(rating => {
        if (rating.userID === userID) {
            returned = rating.numberOfRatings
        }
    })
    return returned
}

async function getReviews(checkReview, placeID, numberOfReviews) {
    var returned = []
    if (checkReview) {
        returned.push(checkReview)
    }
    const reviews = await Review.find({ reviewedPlace: placeID })
    reviews.forEach(review => {
        if (returned.indexOf(review.reviewID) === -1) {
            returned.push(review.reviewID)
        }
    })

    if (numberOfReviews < 0) {
        return returned
    } else if (numberOfReviews === 0) {
        return []
    } else if (reviews.length >= numberOfReviews) {
        returned = returned.splice(0, numberOfReviews)
        return returned
    } else {
        return returned
    }
}

async function checkIfReviewed(userID, placeID) {
    var returned = false
    const found = await Review.find({ reviewedPlace: placeID })
    if (found != null) {
        found.forEach(review => {
            if (review.reviewer === userID) {
                returned = review.reviewID
            }
        })
    }
    return returned
}


async function getBusinessProfile(userID, numberOfPhotos, numberOfReviews, placeID) {
    if (placeID == null) {
        return {
            status: 400,
            message: "Please Insert an ID"
        }
    }
    var place = await Place.findOne({ placeID })
    if (place == null) {
        return {
            status: 400,
            message: "Could not find place"
        }
    }
    var addressFetched = getReadableAddress(place.placeLocation.latitude, place.placeLocation.longitude)
    const user = await User.find({ id: userID })
    const bookmarks = user[0].bookmarks
    var bookmarkedFlag = false
    var placeReturned = {
        photos: [],
        reviews: []
    }
    if (bookmarks.indexOf(place.placeID) >= 0) {
        bookmarkedFlag = true
    }
    placeReturned.bookmarked = bookmarkedFlag
    placeReturned.name = place.placeName
    placeReturned.price = place.placePrice
    placeReturned.category = place.placeCategory
    placeReturned.openDays = place.placeOpenDays
    placeReturned.openHours = place.placeOpenHours
    placeReturned.overview = place.placeOverview
    placeReturned.location = place.placeLocation
    placeReturned.rating = place.placeRating
    placeReturned.numberOfRatings = place.placeRatings.length
    placeReturned.profilePicture = place.placeProfilePicture
    placeReturned.myRating = await getRating(userID, placeID)
    var checkReviewer = await checkIfReviewed(userID, placeID)
    placeReturned.reviewedByMe = (checkReviewer != false)? true : false
    placeReturned.reviews = await getReviews(checkReviewer, placeID, numberOfReviews)
    placeReturned.address = {
        major: addressFetched.address.major,
        minor: addressFetched.address.minor
    }

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
    if (numberOfPhotos > 0 && numberOfPhotos <=  place.placePhotos.length && place.placePhotos.length > 0) {
        placeReturned.photos = place.placePhotos.slice(0, numberOfPhotos)
    } else if (numberOfPhotos === 0 || place.placePhotos.length === 0) {
        placeReturned.photos = []
    } else if (numberOfPhotos < 0) {
        placeReturned.photos = place.placePhotos
    } else {
        placeReturned.photos = place.placePhotos
    } 

    await Place.updateOne({ placeID }, { placeViews: views })

    return {
        status: 200,
        profile: placeReturned
    }
}

module.exports = getBusinessProfile