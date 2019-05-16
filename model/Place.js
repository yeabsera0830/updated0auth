const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    placeID: {type: String, unique: true},
    
})

var Place = mongoose.model('places1', placeSchema)
module.exports = Place