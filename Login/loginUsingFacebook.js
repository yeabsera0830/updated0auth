var User = require('../model/User')
var connect = require('../config/auth').connect
var axios = require('axios')

connect()
async function loginUsingFacebook(token) {
    const url = `https://graph.facebook.com/v3.3/me?fields=email,name&access_token=${token}`
    return await axios.get(url)
                .then(async info => {
                    const facebookID = info.data.id
                    return await User.findOne({ facebookID : facebookID })
                        .then(user => {
                            return {
                                status: 200,
                                accessToken: user.zeilaToken
                            }
                        })
                        .catch(err => {
                            return {
                                status:400,
                                message: 'You don\'t have a Zeila account. You should signup instead'
                            }
                        })
                })
                .catch(err => {
                    return {
                        status: 400,
                        message: 'Could Not Sign In User'
                    }
                })
}

module.exports = loginUsingFacebook