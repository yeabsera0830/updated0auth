const Review = require('../../../model/Review')

async function getReview(reviewID, userID) {
    const found = await Review.findOne({ reviewID: reviewID })
    if (found == null) {
        return {
            status: 400,
            message: "Could not find review"
        }
    }
    var likedByMe = false
    likes = found.likedBy
    likes.forEach(like => {
        if (like === userID) {
            likedByMe = true
        }
    })
    var returned = {
        reviewer: found.reviewer,
        reviewedPlace: found.reviewedPlace,
        likes: likes.length,
        likedByMe: likedByMe,
        text: found.text
    }
    return {
        status: 200,
        review: returned
    }
}

module.exports = getReview