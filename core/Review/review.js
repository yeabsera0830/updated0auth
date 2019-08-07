const router = require('express').Router()
const Routes = require('../Routes')
const checkAppSecret = require('../../permissions/checkAppSecret')
const checkAccessToken = require('../../permissions/checkAccessToken')

const like = require('./controllers/like')
router.post(Routes['likeReview'], async (req, res) => {
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
            message: "Unable to get place"
        })
    }

    if (req.body.id == undefined) {
        return res.status(400).send({
            status: 400,
            message: "Unable to get place"
        })
    }

    const reviewID = req.body.id
    const userID = check.id
    const response = await like(reviewID, parseInt(userID))
    res.status(response.status).send(response)
})

const unlike = require('./controllers/unlike')
router.post(Routes['unlikeReview'], async (req, res) => {
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
            message: "Unable to get place"
        })
    }
    if (req.body.id == undefined) {
        return res.status(400).send({
            status: 400,
            message: "Unable to get place"
        })
    }
    const reviewID = req.body.id
    const userID = check.id
    const response = await unlike(reviewID, parseInt(userID))
    res.status(response.status).send(response)
})


const getReview = require('./controllers/getReview')
router.post(Routes['getReview'], async (req, res) => {
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
            message: "Unable to get review"
        })
    }
    if (req.body.id == undefined) {
        return res.status(400).send({
            status: 400,
            message: "Unable to get review"
        })
    }
    const id = req.body.id
    const response = await getReview(id, check.id)
    res.status(response.status).send(response)
})

const addReview = require('./controllers/addReview')
router.post(Routes['addReview'], async (req, res) => {
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
    if (req.body.id == undefined || req.body.text == undefined) {
        res.status(400).send({
            status: 400,
            message: "Please specify id and text"
        })
    }
    const id = req.body.id
    const text = req.body.text
    const response = await addReview(check.id, id, text)
    res.status(response.status).send(response)
})

module.exports = router