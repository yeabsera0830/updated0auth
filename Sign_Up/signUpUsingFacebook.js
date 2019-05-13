var User = require('../model/User')
var bcrypt = require('bcryptjs')
var axios = require('axios')
var connect = require('../config/auth').connect
var Promise = require('promise')

function rand(count) {
    var generated = ""
    for (let i = 0; i < count; i++)
        generated += Math.random().toString(36).substr(2)
    return generated
}

async function checkIfUserExists(token) {
    return await axios.get(`https://graph.facebook.com/v3.3/me?fields=email,name&access_token=${token}`)
                .then(async info => {
                    facebookID = info.data.id
                    return await User.findOne({ facebookID: facebookID })
                                .then(user => {
                                    if (user) {
                                        return "User Already Exists"
                                    } else {
                                        return false
                                    }
                                })
                })
                .catch(err => false)
}

async function signUpUsingFacebook(token) {
    const checkedMessage = await checkIfUserExists(token)
    if (checkedMessage) {
        return {
            status: 400,
            message: checkedMessage
        }
    }
    const url = `https://graph.facebook.com/v3.3/me?fields=email,name&access_token=${token}`
    return await axios.get(url)
        .then(async info => {
            await connect()
            var newUser = new User()
            newUser.zeilaID = rand(4)
            newUser.name = info.data.name
            newUser.facebookID = info.data.id
            newUser.zeilaToken = rand(9)
            newUser.email = info.data.email
            return await newUser.save()
                    .then(user => {
                        console.log("User added successfully")
                        return {
                            status: 200,
                            token: user.zeilaToken
                        }
                    })
                    .catch(err => {
                        console.log("User Could Not Be Added")
                        console.log(err)
                        return {
                            status: 400,
                            message: "Could Not Add User"
                        }
                    })
        })
        .catch(err => {
            console.log("Invalid Token. It may be expired")
            return {
                status: 400,
                message: "Unable to Sign Up"
            }
        })
}

module.exports = signUpUsingFacebook

