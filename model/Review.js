const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    reviewID: {type: Number, unique: true},
    reviewer: {type: Number, unique: false},
    text: {type: String, unique: false},
    reviewedPlace: {type: Number, unique: false},
    likedBy: [
        {type: Number, unique: false}
    ]
})

var Review = mongoose.model('reviews', reviewSchema)
module.exports = Review