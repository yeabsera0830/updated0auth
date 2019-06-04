const User = require('../model/User')

async function checkAccessToken(accessToken) {
    const userFound = await User.findOne({ zeilaToken: accessToken })
    return userFound
}

module.exports = checkAccessToken