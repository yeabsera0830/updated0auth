const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    placeID: {type: Number, unique: true},
    fourSquareID: {type: String, unique: true},
    placeName: {type: String},
    placeType: {type: String, unique: false},
    placeOverview: {type: String, unique: false},
    placeLocation: {
        latitude: {type: Number, unique: true},
        longitude: {type: Number, unique: true}
    },
    placeRating: {type: Number, unique: false},
    placeNumberOfRating: {type: Number, unique: false},
    placePicture: {type: String, unique: false}
})

var Place = mongoose.model('places1', placeSchema)
module.exports = Place