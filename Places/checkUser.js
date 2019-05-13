var User = require('../model/User')
var bcrypt = require('bcryptjs')
var connect = require('../config/auth').connect

connect()

async function checkZeilaToken(zeilaToken) {
    return await User.findOne( { zeilaToken: zeilaToken } )
            .then(data => false)
            .catch(err => true)
}

module.exports = checkZeilaToken