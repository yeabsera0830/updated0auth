var User = require('../model/User')
var bcrypt = require('bcryptjs')
var connect = require('../config/auth').connect

connect()

function rand(count) {
    var generated = ""
    for (let i = 0; i < count; i++)
        generated += Math.random().toString(36).substr(2)
    return generated
}

async function checkIfUserExists(phoneNumber) {
    return await User.findOne({ phoneNumber: phoneNumber })
                    .then(user => user.phoneNumber)
                    .catch(err => false)        
}

async function signUpUsingPhoneNumber(phoneNumber, password) {
    const checkedMessage = await checkIfUserExists(phoneNumber)
    if (checkedMessage) {
        return {
            status: 400,
            message: "You already have a Zeila account. You should login instead"
        }
    }
    
    if (phoneNumber == null) {
        return {
            status: 400,
            message: "Please enter the phone number"
        }
    }

    if (password == null) {
        return {
            status: 400,
            message: "Please enter the password"
        }
    }

    var newUser = new User()
    newUser.id = await User.countDocuments() + 1 + ""
    newUser.firstName = null
    newUser.middleName = null
    newUser.lastName = null
    newUser.profilePicture = null
    newUser.bookmarks = []
    newUser.friends = []
    newUser.reviews = []
    newUser.catagoryOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    newUser.facebookID = null
    newUser.zeilaToken = rand(9)
    newUser.email = null
    newUser.phoneNumber = phoneNumber
    newUser.password = bcrypt.hashSync(password)
    return await newUser.save()
            .then(user => {
                console.log("User added successfully")
                return {
                    status: 200,
                    accessToken: user.zeilaToken
                }
            })
            .catch(err => {
                console.log(err)
                return {
                    status: 400,
                    message: "Could Not Add User"
                }
            })
}

module.exports = signUpUsingPhoneNumber