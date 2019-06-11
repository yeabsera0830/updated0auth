const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    placeID: {type: Number, unique: true},
    placeName: {type: String, unique: false},
    placePrice: {type: Number, unique: false},
    placeCategory: {type: Number, unique: false},
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
    placeType: {type: String, unique: false},
    placeOverview: {type: String, unique: false},
    placeLocation: {
        latitude: {type: Number, unique: false},
        longitude: {type: Number, unique: false}
    },
    placeRating: {type: Number, unique: false},
    placeRatings: [
        {
            userID: {type: Number, unique: false},
            numberOfRatings: {type: Number, unique: false}
        }
    ],
    placeNumberOfRatings: {type: Number, unique: false},
    placeProfilePicture: {type: String, unique: false},
    placeReviews: [
        {type: Number, unique: false}
    ],
    placePhotos: [
        {type: String, unique: false}
    ],
    placeOwner: {type: Number, unique: false},
    placeAddedOn: {type: Number, unique: false},
    placeAddedBy: {type: Number, unique: false}
})

var Place = mongoose.model('places3', placeSchema)
module.exports = Place