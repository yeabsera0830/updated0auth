const Review = require('../model/Review')
const Place = require('../model/Place')

async function addReview(userID, id, text) {
    const found = await Place.findOne({ placeID: id })
    if (found == null) {
        return {
            status: 400,
            message: "Place could not be found"
        }
    }

    var newReview = new Review()
    newReview.reviewID = await Review.countDocuments() + 1
    newReview.reviewer = userID
    newReview.reviewedPlace = id
    newReview.text = text
    newReview.likedBy = []
    await newReview.save()
    return {
        status: 200,
        reviewID: newReview.reviewID
    }
}

module.exports = addReview