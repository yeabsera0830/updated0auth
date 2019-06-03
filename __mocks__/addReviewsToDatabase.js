const ReviewSave = require('../model/Review')
const connect = require('../config/auth').connect
const Reviews = require('./Reviews').Reviews

async function addReviews(Reviews) {
    connect()
    var newReview = null
    var success = null
    for (let i = 0; i < Reviews.length; ++i) {
        newReview = new ReviewSave()
        newReview.reviewID = Reviews[i].reviewID
        newReview.reviewer = Reviews[i].reviewer
        newReview.reviewedPlace = Reviews[i].reviewedPlace
        newReview.text = Reviews[i].text
        newReview.likedBy = Reviews[i].likedBy
        success = await newReview.save().then(res => console.log("Success")).catch(err => console.log(err))
    }
}

async function test() {
    connect()
    await addReviews(Reviews)
}

async function callback() {
    connect()
    await test()
}
connect()
callback()