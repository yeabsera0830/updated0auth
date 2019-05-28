var User = require('../model/User')
var connect = require('../config/auth').connect

connect()

async function checkZeilaToken(accessToken) {
    const found =  await User.findOne({ zeilaToken: accessToken }).then(token => token).catch(err => { console.log(err); return err; })
    if (found != null) {
        return false
    } else {
        return true
    }
}

module.exports = checkZeilaToken