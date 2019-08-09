const Reviews = require('../../../model/Review')

async function unlike(reviewID, userID) {
    if (reviewID == null || typeof reviewID != 'number') {
        return {
            status: 400,
            message: "Could not find review"
        }
    }

    var found = await Reviews.findOne({ reviewID })
    if (found == null) {
        return {
            status: 400,
            message: "Could not find review"
        }
    }
    likes = found.likedBy
    likeAmount = likes.length
    const foundUser = likes.find(likedBy => likedBy === userID)
    if (foundUser) {
        for (let i = 0; i < likes.length; ++i) {
            if (likes[i] === userID) {
                likeAmount--
                likes.splice(i, 1)
                break
            }
        }
    }
    await Reviews.updateOne({ reviewID }, { likedBy: likes })
    return {
        status: 200,
        newLikes: likeAmount
    }
}

module.exports = unlike