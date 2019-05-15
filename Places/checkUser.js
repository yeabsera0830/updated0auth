var User = require('../model/User')
var bcrypt = require('bcryptjs')
var connect = require('../config/auth').connect

connect()

async function checkZeilaToken(accessToken) {
    return await User.findOne( { zeilaToken: accessToken } )
            .then(data => false)
            .catch(err => true)
}

module.exports = checkZeilaToken