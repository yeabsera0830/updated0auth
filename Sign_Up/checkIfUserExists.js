var User = require('../model/User')
var axios = require('axios')

async function checkIfUserExists(token) {
    return await axios.get(`https://graph.facebook.com/v3.3/me?fields=id,first_name,middle_name,last_name,email,picture&access_token=${token}`)
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

module.exports = checkIfUserExists