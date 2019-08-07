const Reviews = require('../../../model/Review')

async function like(reviewID, userID) {
    if (reviewID == null || typeof reviewID != 'number') {
        return {
            status: 400,
            message: "Could not find review"
        }
    }

    var found = await Reviews.findOne({ reviewID: reviewID })
    if (found == null) {
        return {
            status: 400,
            message: "Could not find review"
        }
    }
    likes = found.likedBy
    likeAmount = likes.length
    const foundUser = likes.find(likedBy => likedBy === userID)
    if (foundUser == null) {
        likes.push(userID)
        likeAmount++
    }
    await Reviews.updateOne({ reviewID: reviewID }, { likedBy: likes })
    return {
        status: 200,
        newLikes: likeAmount
    }
}

module.exports = like