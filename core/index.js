const router = require('express').Router()
const Routes = require('./Routes')
const User = require('../model/User')
const Place = require('../model/Place')
const Review = require('../model/Review')
const addUsers = require('../FAKE_DATA/addUsersToDatabase')
const addPlaces = require('../FAKE_DATA/addBussinessesToDatabase')
const addReviews = require('../FAKE_DATA/addReviewsToDatabase')
const updateUsers = require('../FAKE_DATA/updateForLocalUsage').updateUsers
const updatePlaces = require('../FAKE_DATA/updateForLocalUsage').updatePlaces
const { setLocalDB } = require('../config/env')

const checkAppSecret = require('../permissions/checkAppSecret')
const checkAccessToken = require('../permissions/checkAccessToken')

router.get(Routes['root'], (req, res) => {
    res.send("The Zeila Server is up and running")
})

router.delete(Routes['removeAll'], async (req, res) => {
    await User.deleteMany()
    await Place.deleteMany()
    await Review.deleteMany()
    res.status(200).send("Everything Deleted Successfully")
})

router.delete(Routes['removeUsers'], async (req, res) => {
    await User.deleteMany()
    res.status(200).send("Users Deleted Successfully")
})

router.delete(Routes['removePlaces'], async (req, res) => {
    await Place.deleteMany()
    res.status(200).send("Places Deleted Successfully")
})

router.delete(Routes['removeReviews'], async (req, res) => {
    await Review.deleteMany()
    res.status(200).send("Reviews Deleted Successfully")
})

router.post(Routes['addEverything'], async (req, res) => {
    await addUsers()
    await addPlaces()
    await addReviews()
    if (setLocalDB) {
        await updateUsers()
        await updatePlaces()
    }
    res.status(200).send("Everything added successfully")
})
router.post(Routes['addUsers'], async (req, res) => {
    await addUsers()
    await updateUsers()
    res.status(200).send("Users added successfully")
})

router.post(Routes['addPlaces'], async (req, res) => {
    await addPlaces()
    await updatePlaces()
    res.status(200).send("Places added successfully")
})

router.post(Routes['addReviews'], async (req, res) => {
    await addReviews()
    res.status(200).send("Reviews added successfully")
})

const rate = require('./controllers/rate')
router.post(Routes['rate'], async (req, res) => {
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
            message: "Unable to rate place"
        })
        return
    }

    if (req.body.id == undefined || req.body.rating == undefined) {
        return res.status(400).send({
            status: 400,
            message: "Unable to rate place"
        })
    }

    const placeID = req.body.id
    const userID = check.id
    const rating = req.body.rating
    const response = await rate(placeID, userID, rating)
    res.status(response.status).send(response)
})

const multer = require("multer")
const fs = require('fs')
const upload = multer({
    dest: fs.realpathSync(__dirname + "../../store", [])
})
const { uploadPhoto } = require('./controllers/uploadPhoto')
router.post(Routes['uploadPhoto'], upload.any(), async (req, res) => {
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
            message: "Unable to upload photo"
        })
    }

    if (req.files[0] == undefined) {
        return res.status(400).send({
            status: 400,
            message: "Unable to upload photo"
        })
    }

    if (req.body.id == undefined) {
        return res.status(400).send({
            status: 400,
            message: "Unable to upload photo"
        })
    }
    var response = null
    response = await uploadPhoto(req.body.id, req.files[0])
    if (response.status === 400) {
        return res.status(400).send({
            status: 400,
            message: response.message
        })
    }
    res.status(response.status).send(response)
})

router.get(Routes['getImage'], (req, res) => {
    const id = req.params.id
    const file = fs.realpathSync(__dirname + '../../store') + '/' + id
    return res.sendFile(file)
})

const saveBasicInfo = require('./controllers/saveBasicInfo')
router.post(Routes['saveBasicInfo'], upload.any(), async (req, res) => {
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
            message: "Could not set profile picture"
        })
        return
    }

    if (req.files[0] == undefined) {
        return res.status(400).send({
            status: 400,
            message: "Please send me a file"
        })
    }

    if (req.body.name == undefined) {
        return res.status(400).send({
            status: 400,
            message: "Please send me a name"
        })
    }
    const response = await saveBasicInfo(check.id, req.body.name, req.files[0])
    res.status(response.status).send(response)
})

router.get(Routes['getUser'], async (req, res) => {
    const found = await User.findOne({ id: req.params.id })
    if (found) {
        res.send(found)
    } else {
        res.status(400).send("User not found")
    }
})

router.get(Routes['getPlace'], async (req, res) => {
    const found = await Place.findOne({ placeID: req.params.id })
    if (found) {
        res.send(found)
    } else {
        res.status(400).send("Place not found")
    }
})

router.delete(Routes['deletePlace'], async(req, res) => {
    const found = await Place.findOne({ placeID: req.params.id })
    if (found) {
        await Place.deleteOne({ placeID: req.params.id })
        res.send("Place Deleted")
    } else {
        res.status(400).send("Place not found")
    }
})

router.get(Routes['getReview'], async (req, res) => {
    const found = await Review.findOne({ reviewID: req.params.id })
    if (found) {
        res.send(found)
    } else {
        res.status(400).send("Review not found")
    }
})

module.exports = router