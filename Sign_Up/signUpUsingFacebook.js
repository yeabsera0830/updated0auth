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
                                        return "You already have a Zeila account. You should login instead"
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
    await connect()
    console.log(token)
    const url = `https://graph.facebook.com/v3.3/me?fields=email,name&access_token=${token}`
    return await axios.get(url)
        .then(async info => {
            var name = info.data.name
            var partials = name.split(" ")
            var newUser = new User()
            if (partials.length == 1) {
                newUser.firstName = partials[0]
                newUser.middleName = ""
                newUser.lastName = ""
            }
            else if (partials.length == 2) {
                newUser.firstName = partials[0]
                newUser.middleName = ""
                newUser.lastName = partials[1]
            } else if (partials == 3) {
                newUser.firstName = partials[0]
                newUser.middleName = partials[1]
                newUser.lastName = partials[2]
            } else {
                newUser.firstName = partials[0]
                newUser.middleName = partials[1]
                newUser.lastName = ""
                for (let k = 2; k < partials.length; ++k) {
                    newUser.lastName += " " + partials[k]
                }
            }
            newUser.id = await User.countDocuments() + 1
            newUser.facebookID = info.data.id
            newUser.zeilaToken = rand(9)
            newUser.email = info.data.email
            return await newUser.save()
                    .then(user => {
                        console.log("User added successfully")
                        return {
                            status: 200,
                            accessToken: user.zeilaToken
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
            console.log(err)
            return {
                status: 400,
                message: "Unable to signup with facebook"
            }
        })
}

module.exports = signUpUsingFacebook

