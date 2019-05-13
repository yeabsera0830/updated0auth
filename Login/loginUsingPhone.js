var User = require('../model/User')
var bcrypt = require('bcryptjs')

var connect = require('../config/auth').connect
connect()

async function loginPhone(phoneNumber, password) {
    return await User.findOne({ phoneNumber: phoneNumber })
            .then(async user => {
                if (bcrypt.compareSync(password, user.password)) {
                    console.log("User Has Logged In")
                    return {
                        status: 200,
                        token: user.zeilaToken
                    }
                } else {
                    console.log("User Password Is Incorrect")
                    return {
                        status: 400,
                        message: "Incorrect Username or Password"
                    }
                }
            })
            .catch(err => {
                return {
                    status: 400,
                    message: 'Incorrect Username or Password'
                }
            })
}

module.exports = loginPhone