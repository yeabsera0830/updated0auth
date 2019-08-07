const router = require('express').Router()
const Routes = require('../Routes')
const checkAppSecret = require('../../permissions/checkAppSecret')
const checkAccessToken = require('../../permissions/checkAccessToken')

const getBusinessProfile = require('./controllers/getBusinessProfile')
router.post(Routes['getBusinessProfile'], async (req, res) => {
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
            message: "Unable to get place"
        })
        return
    }

    if (req.body.numberOfPhotos == undefined || req.body.numberOfPhotos == null) {
        res.status(400).send({
            status: 400,
            message: "Unable to get place"
        })
        return
    }

    if (req.body.numberOfReviews == undefined || req.body.numberOfReviews == null) {
        res.status(400).send({
            status: 400,
            message: "Unable to get place"
        })
        return
    }

    const placeID = req.body.id
    const numberOfPhotos = req.body.numberOfPhotos
    const numberOfReviews = req.body.numberOfReviews
    const response = await getBusinessProfile(check.id, numberOfPhotos, numberOfReviews, placeID)
    res.status(response.status).send(response)
})

const searchPlaces = require('./controllers/searchPlaces')
router.post(Routes['searchPlaces'], async (req, res) => {
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
            message: "Unable to get place"
        })
        return
    }
    if (req.body.location == null || req.body.location == undefined) {
        res.status(400).send({
            status: 400,
            message: "Could not find location"
        })
        return
    }

    if (req.body.startIndex == undefined || req.body.finishIndex == undefined) {
        res.status(400).send({
            status: 400,
            message: "Please send me start and finish indexes"
        })
    }

    var filters = null
    if (typeof req.body.filters == 'undefined') {
        filters = null
    } else {
        filters = req.body.filters
    }
    const latitude = req.body.location.latitude
    const longitude = req.body.location.longitude
    console.log(req.body.filters)
    const response = await searchPlaces(latitude, longitude, filters, check.id, req.body.startIndex, req.body.finishIndex)
    res.status(response.status).send(response)
})

const searchPerson = require('./controllers/searchPerson')
router.post(Routes['searchPerson'], async (req, res) => {
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
            message: "Unable to get user"
        })
        return
    }
    const id = req.body.id
    const response = await searchPerson(id)
    res.status(response.status).send(response)
})

const searchSuggestions = require('./controllers/searchSuggestions')
router.post(Routes['searchSuggestions'], async (req, res) => {
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
            message: "Unable to get places"
        })
        return
    }

    if (req.body.numberOfSuggestions == undefined) {
        res.status(400).send({
            status: 400,
            message: "Unable to get places"
        })
    }

    if (req.body.partialName == undefined) {
        return res.status(400).send({
            status: 400,
            message: "Could not find place"
        })
    }

    const partialName = req.body.partialName
    const numberOfSuggestions = req.body.numberOfSuggestions
    const response = await searchSuggestions(partialName, numberOfSuggestions)
    res.status(response.status).send(response)
})

module.exports = router