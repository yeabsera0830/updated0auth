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
            message: "User Already Exists"
        }
    }
    
    var newUser = new User()
    newUser.zeilaID = rand(4)
    newUser.zeilaToken = rand(9)
    newUser.phoneNumber = phoneNumber
    newUser.password = bcrypt.hashSync(password)
    console.log(newUser)
    return await newUser.save()
            .then(user => {
                console.log("User added successfully")
                return {
                    status: 200,
                    token: user.zeilaToken
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