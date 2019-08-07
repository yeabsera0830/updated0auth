const router = require('express').Router()
const Routes = require('../Routes')
const checkAppSecret = require('../../permissions/checkAppSecret')

const loginPhone = require('./controllers/loginPhone')
router.post(Routes['loginPhone'], async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (!checkSecret) {
        res.status(400).send({
            status: 400,
            message: 'Invalid Request'
        })
        return
    }
    const { phoneNumber, password } = req.body

    if (!phoneNumber) {
        return res.status(400).send({
            status: 400,
            message: "Please send me the phone number"
        })
    }

    if (!password) {
        return res.status(400).send({
            status: 400,
            message: "Please send me the password"
        })
    }

    const response = await loginPhone(phoneNumber, password)
    res.status(response.status).send(response)

})


const loginFacebook = require('./controllers/loginFacebook')
router.post(Routes['loginFacebook'], async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (!checkSecret) {
        res.status(400).send({
            status: 400,
            message: 'Invalid Request'
        })
        return
    }
    
    const { facebookToken } = req.body

    if (!facebookToken) {
        return res.status(400).send({
            status: 400,
            message: "Please send me the facebook token"
        })
    }

    const response = await loginFacebook(facebookToken)
    res.status(response.status).send(response)
})

module.exports = router