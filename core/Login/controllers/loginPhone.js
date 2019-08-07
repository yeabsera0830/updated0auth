var User = require('../../../model/User')
var bcrypt = require('bcryptjs')

async function loginPhone(phoneNumber, password) {
    const found = await User.findOne({ phoneNumber: phoneNumber })
    if (!found) {
        return {
            status: 400,
            message: ' Incorrect phone number or password'
        }
    }

    if (bcrypt.compareSync(password, found.password)) {
        return {
            status: 200,
            accessToken: found.zeilaToken
        }
    } else {
        return {
            status: 400,
            message: "Incorrect Username or Password"
        }
    }
}

module.exports = loginPhone