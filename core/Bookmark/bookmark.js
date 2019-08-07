const router = require('express').Router()
const Routes = require('../Routes')
const checkAppSecret = require('../../permissions/checkAppSecret')
const checkAccessToken = require('../../permissions/checkAccessToken')

const addBookmark = require('./controllers/addBookmark')
router.post(Routes['addBookmark'], async (req, res) => {
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
            message: "Unable to add bookmarks"
        })
    }

    if (req.body.id == undefined) {
        return res.status(400).send({
            status: 400,
            message: "Unable to add bookmarks"
        })
    }

    const placeID = req.body.id
    const response = await addBookmark(check.id, placeID)
    res.status(response.status).send(response)
})

const removeBookmark = require('./controllers/removeBookmark')
router.post(Routes['removeBookmark'], async (req, res) => {
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
            message: "Unable to add bookmarks"
        })
    }

    const placeID = req.body.id
    const response = await removeBookmark(check.id, placeID)
    res.status(response.status).send(response)
})

module.exports = router