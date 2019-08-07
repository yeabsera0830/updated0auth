const router = require('express').Router()
const Routes = require('../Routes')
const checkAppSecret = require('../../permissions/checkAppSecret')
const checkAccessToken = require('../../permissions/checkAccessToken')

const getNearbyPlaces = require('./controllers/getNearbyPlaces')
router.post(Routes['getNearbyPlaces'], async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (!checkSecret) {
        return res.status(400).send({
            status: 400,
            message: 'Invalid Request'
        })
    }

    const check = await checkAccessToken(req.body.accessToken)
    if (check == null) {
        return res.status(400).send({
            status: 400,
            message: "Unable to get places"
        })
    }

    const { location } = req.body
    if (!location.latitude || !location.longitude || typeof(location.latitude) != 'number' || typeof(location.longitude) != 'number') {
        return res.status(400).send({
            status: 400,
            message: "Please send me the correct coordinate"
        })
    }

    const latitude = location.latitude
    const longitude = location.longitude
    const response = await getNearbyPlaces(latitude, longitude)
    res.status(response.status).send(response)
})

const getNewPlaces = require('./controllers/getNewPlaces')
router.post(Routes['getNewPlaces'], async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (!checkSecret) {
        return res.status(400).send({
            status: 400,
            message: 'Invalid Request'
        })
    }
    const check = await checkAccessToken(req.body.accessToken)
    if (check == null) {
        return res.status(400).send({
            status: 400,
            message: "Unable to get places"
        })
    }

    const { location, startIndex, finishIndex } = req.body

    if (!location || !location.latitude || !location.longitude) {
        return res.status(400).send({
            status: 400,
            message: "Unable to get places"
        })
    }

    if (typeof location.latitude != 'number' || typeof location.longitude != 'number') {
        return res.status(400).send({
            status: 400,
            message: "Unable to get places"
        })
    }

    if (startIndex == undefined || finishIndex == undefined) {
        return res.status(400).send({
            status: 400,
            message: "Unable to get places"
        })
    }

    if (typeof startIndex != "number" || typeof finishIndex != "number") {
        return res.status(400).send({
            status: 400,
            message: "Unable to get places"
        })
    }

    if (startIndex < 0 || finishIndex < 1) {
        return res.status(400).send({
            status: 400,
            message: "Unable to get places"
        })
    }

    if (startIndex >= finishIndex) {
        return res.status(400).send({
            status: 400,
            message: "Unable to get places"
        })
    }

    const response = await getNewPlaces(check.id, location.latitude, location.longitude, startIndex, finishIndex)
    res.status(response.status).send(response)
})

const getTrendingPlaces = require('./controllers/TrendingPlaces')
router.post(Routes['getTrendingPlaces'], async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (!checkSecret) {
        return res.status(400).send({
            status: 400,
            message: 'Invalid Request'
        })
    }
    const check = await checkAccessToken(req.body.accessToken)
    if (check == null) {
        return res.status(400).send({
            status: 400,
            message: "Unable to get places"
        })
    }

    const { startIndex, finishIndex } = req.body

    if (startIndex == undefined || finishIndex == undefined) {
        return res.status(400).send({
            status: 400,
            message: "Unable to get places"
        })
    }

    const response = await getTrendingPlaces(check.id, startIndex, finishIndex)
    res.status(response.status).send(response)
})

const multer = require('multer')
const fs = require('fs')
const upload = multer({
    dest: fs.realpathSync(__dirname + "../../../store/", [])
})
const { uploadImageOnly } = require('../controllers/uploadPhoto')
const { addPlace } = require('./controllers/addPlace')
const { strToObject, stringToArray } = require('../common/common')
router.post(Routes['addPlace'], upload.any(),  async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (!checkSecret) {
        return res.status(400).json({
            status: 400,
            message: 'Invalid Request'
        })
    }
    const check = await checkAccessToken(req.body.accessToken)
    if (check == null) {
        return res.status(400).json({
            status: 400,
            message: "Unable to get places"
        })
    }

    var profilePictureLink = null
    var pictures = []
    for (let i = 0; i < req.files.length; ++i) {
        if (req.files[i]['fieldname'] === 'profilePicture') {
            var { link } = await uploadImageOnly(req.files[i])
            profilePictureLink = link
        } else {
            var { link } = await uploadImageOnly(req.files[i])
            pictures.push(link)
        }
    }

    var found = false
    req.files.forEach(file => {
        if (file['fieldname'] === 'profilePicture') found = true
    })

    if (!found) {
        return res.status(400).json("Please send me the profile picture")
    }

    var { name, category, description, location, tags, priceRange, tags, workingDays, uniqueHours, owner } = req.body

    if (!name) {
        return res.status(400).json("Please send me the name")
    }

    if (!category) {
        return res.status(400).json("Please send me the category")
    }

    if (!description) {
        description = null
    }

    if (!location) {
        return res.status(400).json("Please send me the location")
    } else {
        var { latitude, longitude } = strToObject(location)
        if (!latitude || !longitude) {
            return res.status(400).json("Please send me the exact coordinates")
        }
    }

    if (!tags) {
        tags = null
    }

    if (!priceRange) {
        priceRange = null
    }

    if (!tags) {
        tags = null
    }

    if (!uniqueHours) {
        uniqueHours = null
    } else {
        var { openingTime, closingTime } = strToObject(uniqueHours)
        if (!openingTime || !closingTime) {
            return res.status(400).json("Please send both opening time and closing time")
        }
    }

    if (!workingDays) {
        return res.status(400).json("Please send me the workingDays")
    } else {
        workingDays = stringToArray(workingDays)
    }

    if (!owner) {
        return res.status(400).json("Please send me the place owner")
    }

    const response = await addPlace(profilePictureLink, name, priceRange, category, tags, workingDays, { openingTime, closingTime }, description, { latitude, longitude }, pictures, owner, check.id)
    return res.status(response.status).json(response)
})

module.exports = router
