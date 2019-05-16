const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    placeID: {type: String, unique: true},
    placeName: {type: String},
    placeLocation: {
        latitude: {type: Number, unique: true},
        longitude: {type: Number, unique: true}
    },
    placeMinor: {type: String, unique: false},
    placeMajor: {type: String, unique: false}
})

var Place = mongoose.model('places1', placeSchema)
module.exports = Place