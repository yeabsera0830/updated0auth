const router = require('express').Router()
const Routes = require('../Routes')

const { signUpUsingPhoneNumber } = require('./controllers/signupPhone')
const checkAppSecret = require('../../permissions/checkAppSecret')
const { sendText, verify } = require('./controllers/text')

router.post(Routes['sendText'], async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (!checkSecret) {
        return res.status(400).sejsonnd({
            status: 400,
            message: 'Invalid Request'
        })
    }

    const { phoneNumber } = req.body
    if (!phoneNumber) {
        return res.status(400).json({
            status: 400,
            message: 'Send the phone number'
        })
    }

    const response = await sendText(phoneNumber)
    return res.status(response.status).send(response)
})

/*

router.post(Routes['verifyAndSignUpPhone'], async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (!checkSecret) {
        return res.status(400).sejsonnd({
            status: 400,
            message: 'Invalid Request'
        })
    }

    const { phoneNumber, password, code } = req.body
    var errors = []
    if (!phoneNumber) {
        errors.push("Please send me the phone number")
    }

    if (!password) {
        errors.push("Please send me the password")
    }

    if (!code) {
        errors.push("Please send me the verification code")
    }

    if (errors.length > 0) {
        return res.status(400).json({
            status: 400,
            message: errors
        })
    }
    const response = await verify(phoneNumber, password, code)
    return res.status(response.status).json(response)
})

*/
router.post(Routes['verifyAndSignUpPhone'], async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (!checkSecret) {
        return res.status(400).json({
            status: 400,
            message: 'Invalid Request'
        })
    }

    const { phoneNumber, password } = req.body
    var errors = []
    if (!phoneNumber) {
        errors.push("Please send me the phone number")
    }

    if (!password) {
        errors.push("Please send me the password")
    }

    if (errors.length > 0) {
        return res.status(400).json({
            status: 400,
            message: errors.toString()
        })
    }
    const response = await signUpUsingPhoneNumber(phoneNumber, password)
    return res.status(response.status).json(response)
})

const signUpUsingFacebook = require('./controllers/signupFacebook')
router.post(Routes['signupFacebook'], async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (!checkSecret) {
        return res.status(400).send({
            status: 400,
            message: 'Invalid Request'
        })
    }
    const { facebookToken } = req.body

    if (!facebookToken) {
        return res.status(400).send({
            status: 400,
            message: "Please send me the facebook token"
        })
    }

    const response = await signUpUsingFacebook(facebookToken)
    res.status(response.status).send(response)
})

module.exports = router