const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    placeID: {type: Number, unique: true},
    placeName: {type: String, unique: false, default: null},
    placePrice: {type: Number, unique: false, default: null},
    placeCategory: {type: Number, unique: false, default: null},
    placeOpenDays: [
        {type: Number, unique: false}
    ],
    placeOpenHours: {
        openingTime: {type: String, unique: false},
        closingTime: {type: String, unique: false}
    },
    placeViews: [
        {
            viewer: {type: Number, unique: false},
            timestamp: {type: Number, unique: false}
        }
    ],
    placeType: {type: String, unique: false, default: null},
    placeOverview: {type: String, unique: false, default: null},
    placeLocation: {
        latitude: {type: Number, unique: false},
        longitude: {type: Number, unique: false}
    },
    placeRating: {type: Number, unique: false, default: 0},
    placeRatings: [
        {
            userID: {type: Number, unique: false},
            numberOfRatings: {type: Number, unique: false}
        }
    ],
    placeNumberOfRatings: {type: Number, unique: false, default: 0},
    placeProfilePicture: {type: String, unique: false, default: null},
    placeReviews: [
        {type: Number, unique: false}
    ],
    placePhotos: [
        {type: String, unique: false}
    ],
    placeTags: {type: String, unique: false, default: null},
    placeOwner: {type: Number, unique: false},
    placeAddedOn: {type: Number, unique: false, default: Date.now},
    placeAddedBy: {type: Number, unique: false}
})

var Place = mongoose.model('places3', placeSchema)
module.exports = Place