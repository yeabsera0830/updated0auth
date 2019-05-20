const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    zeilaID: {type: String, unique: true},
    name: {type: String, default: null, unique: false},
    facebookID: {type: String, default: null, unique: true},
    zeilaToken: {type: String, unique: true},
    email: {type: String, unique: false, default: null},
    phoneNumber: {type: String, unique: false, default: null},
    password: {type: String, default: null, unique: false},
    profilePicture: {type: String, default: null, unique: false},
    reviews: [
        {type: String, unique: false}
    ],
    friends: [
        {type: String, unique: false}
    ]
})

var User = mongoose.model('collection3', userSchema)
module.exports = User