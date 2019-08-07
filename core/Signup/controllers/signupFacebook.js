var User = require('../../../model/User')
var axios = require('axios')
const checkIfUserExists = require('./checkIfUserExists')

function rand(count) {
    var generated = ""
    for (let i = 0; i < count; i++)
        generated += Math.random().toString(36).substr(2)
    return generated
}

async function signUpUsingFacebook(token) {
    const checkedMessage = await checkIfUserExists(token)
    if (checkedMessage) {
        return {
            status: 400,
            message: checkedMessage
        }
    }
    const url = `https://graph.facebook.com/v3.3/me?fields=id,first_name,middle_name,last_name,email,picture&access_token=${token}`
    const newUser = new User()
    return await axios.get(url)
        .then(async info => {
            if (info.data.first_name != undefined) {
                newUser.firstName = info.data.first_name
            } else {
                newUser.firstName = null
            }

            if (info.data.middle_name != undefined) {
                newUser.middleName = info.data.middle_name
            } else {
                newUser.middleName = null
            }

            if (info.data.last_name != undefined) {
                newUser.lastName = info.data.last_name
            } else {
                newUser.lastName = null
            }

            newUser.id = await User.countDocuments() + 1
            newUser.facebookID = info.data.id
            newUser.zeilaToken = rand(9)
            newUser.email = info.data.email
            newUser.profilePicture = info.data.picture.data.url
            newUser.bookmarks = []
            newUser.friends = []
            newUser.reviews = []
            newUser.catagoryOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
            newUser.phoneNumber = null
            newUser.password = null
            return await newUser.save()
                    .then(user => {
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
            return {
                status: 400,
                message: "Unable to signup with facebook"
            }
        })
}

module.exports = signUpUsingFacebook