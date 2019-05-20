const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    zeilaID: {type: String, unique: false},
    name: {type: String, unique: false},
    facebookID: {type: String, unique: false},
    zeilaToken: {type: String, unique: false},
    email: {type: String, unique: false},
    phoneNumber: {type: String, unique: false},
    password: {type: String, unique: false},
    profilePicture: {type: String, unique: false},
    reviews: [
        {type: String, unique: false}
    ],
    friends: [
        {type: String, unique: false}
    ]
})

var User = mongoose.model('collection4', userSchema)
module.exports = User