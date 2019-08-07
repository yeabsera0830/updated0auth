var User = require('../../../model/User')
var bcrypt = require('bcryptjs')

exports.generateAccessToken = (count) => {
    var generated = ""
    for (let i = 0; i < count; i++)
        generated += Math.random().toString(36).substr(2)
    return generated
}

const checkIfUserExists = async (phoneNumber) => {
    const found = await User.findOne({ phoneNumber: phoneNumber })
    return found
}

exports.signUpUsingPhoneNumber = async (phoneNumber, password) => {
    const checkedMessage = await checkIfUserExists(phoneNumber)
    if (checkedMessage) {
        return {
            status: 400,
            message: "You already have a Zeila account. You should login instead"
        }
    }

    var newUser = new User()
    newUser.id = await User.countDocuments() + 1
    newUser.firstName = null
    newUser.middleName = null
    newUser.lastName = null
    newUser.profilePicture = null
    newUser.bookmarks = []
    newUser.friends = []
    newUser.reviews = []
    newUser.catagoryOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    newUser.facebookID = null
    newUser.zeilaToken = this.generateAccessToken(9)
    newUser.email = null
    newUser.phoneNumber = phoneNumber
    newUser.password = bcrypt.hashSync(password)
    return await newUser.save()
            .then(user => {
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