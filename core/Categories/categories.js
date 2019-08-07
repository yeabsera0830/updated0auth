const router = require('express').Router()
const Routes = require('../Routes')
const checkAppSecret = require('../../permissions/checkAppSecret')
const checkAccessToken = require('../../permissions/checkAccessToken')

const getCatagoryOrder = require('./controllers/getCategoryOrder')
router.post(Routes['getCategoryOrder'], async (req, res) => {
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
    const userID = check.id
    const response = await getCatagoryOrder(userID)
    res.status(response.status).send(response)
})

const saveCategoryOrder = require('./controllers/saveCategoryOrder')
router.post(Routes['saveCategoryOrder'], async (req, res) => {
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
            message: "Unable to save categories"
        })
    }

    if (req.body.categories == undefined) {
        return res.status(400).send({
            status: 400,
            message: "Unable to save categories"
        })
    }

    const userID = check.id
    const categories = req.body.categories
    const response = await saveCategoryOrder(userID, categories)
    res.status(response.status).send(response)
})

module.exports = router