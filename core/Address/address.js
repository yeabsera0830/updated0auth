const router = require('express').Router() 
const Routes = require('../Routes')
const checkAppSecret = require('../../permissions/checkAppSecret')
const checkAccessToken = require('../../permissions/checkAccessToken')

const getReadableAddress = require('./controllers/getReadableAddress')
router.post(Routes['getReadableAddress'], async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (!checkSecret) {
        res.status(400).send({
            status: 400,
            message: 'Invalid Request'
        })
    }

    const { accessToken, location } = req.body

    const check = await checkAccessToken(accessToken)
    if (check == null) {
        return res.status(400).send({
            status: 400,
            message: "Unable to find your location"
        })
    }
    
    if (!location.latitude || !location.longitude || typeof(location.latitude) != 'number' || typeof(location.longitude) != 'number') {
        return res.status(400).send({
            status: 400,
            message: "Please send me the correct coordinate"
        })
    }

    const latitude = location.latitude
    const longitude = location.longitude
    const response = await getReadableAddress(latitude, longitude)
    res.status(response.status).send(response)
})

const getCoordinatesFromAddress = require('./controllers/getCoordinates')
router.post(Routes['getCoordinatesFromAddress'], async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (!checkSecret) {
        res.status(400).send({
            status: 400,
            message: 'Invalid Request'
        })
        return
    }
    const check = await checkAccessToken(req.body.accessToken)
    if (check == null) {
        res.status(400).send({
            status: 400,
            message: "No location found with this address"
        })
        return
    }
    const { address } = req.body
    if (!address) {
        return res.status(400).send({
            status: 400,
            message: "No location found with this address"
        })
    }
    const response = await getCoordinatesFromAddress(address)
    res.status(response.status).send(response)
})

const getSuggestions = require('./controllers/getSuggestions')
router.post(Routes['getSuggestions'], (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (!checkSecret) {
        res.status(400).send({
            status: 400,
            message: 'Invalid Request'
        })
        return
    }
    const { partialAddress } = req.body

    if (!partialAddress) {
        return res.status(400).send({
            status: 200,
            suggestions: []
        })
    }

    const response = getSuggestions(partialAddress)
    res.status(response.status).send(response)
})

module.exports = router