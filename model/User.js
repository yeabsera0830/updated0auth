const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: {type: String, unique: false},
    firstName: {type: String, unique: false},
    middleName: {type: String, unique: false},
    lastName: {type: String, unique: false},
    profilePicture: {type: String, unique: false},
    bookmarks: [
        {type: Number, unique: false}
    ],
    friends: [
        {type: Number, unique: false}
    ],
    reviews: [
        {type: Number, unique: false}
    ],
    catagoryOrder: [
        {type: Number, unique: false}
    ],
    facebookID: {type: String, unique: false},
    zeilaToken: {type: String, unique: false},
    email: {type: String, unique: false},
    phoneNumber: {type: String, unique: false},
    password: {type: String, unique: false},
})

var User = mongoose.model('users1', userSchema)
module.exports = User