const express = require('express')
const app = express()

const connect = require('./config/auth').connect

const User = require('./model/User')
const Place = require('./model/Place')
const Review = require('./model/Review')
const checkAppSecret = require('./permissions/checkAppSecret')

app.use(express.json())

const port = process.env.PORT || 8082

app.listen(port, () => console.log("Server Running on *:" + port))


app.get('/', (req, res) => {
    res.send("This server is working")
})

app.delete('/removeAll', async (req, res) => {
    await connect()
    await User.deleteMany()
    res.status(200).send("Users Deleted Succuessfully")
})

app.delete('/removeAllPlaces', async (req, res) => {
    await connect()
    await Place.deleteMany()
    res.status(200).send("Places Deleted Successfully")
})

app.delete('/removeAllReviews', async (req, res) => {
    await connect()
    await Review.deleteMany()
    res.status(200).send("Reviews Deleted Successfully")
})

const signUpUsingPhone = require('./Sign_Up/signUpUsingPhone')
app.post('/signup/phone', async (req, res) => {
    const phoneNumber = req.body.phoneNumber
    const password = req.body.password
    const response = await signUpUsingPhone(phoneNumber, password)
    res.status(response.status).send(response)
})

const signUpUsingFacebook = require('./Sign_Up/signUpUsingFacebook')
app.post('/signup/facebook', async (req, res) => {
    const facebookToken = req.body.facebookToken
    const response = await signUpUsingFacebook(facebookToken)
    res.status(response.status).send(response)
})

const loginPhone = require('./Login/loginUsingPhone')
app.post('/login/phone', async (req, res) => {
    const phoneNumber = req.body.phoneNumber
    const password = req.body.password
    const response = await loginPhone(phoneNumber, password)
    res.status(response.status).send(response)

})

const loginFacebook = require('./Login/loginUsingFacebook')
app.post('/login/facebook', async (req, res) => {
    const facebookToken = req.body.facebookToken
    const response = await loginFacebook(facebookToken)
    res.status(response.status).send(response)
})

const getReadableAddress = require('./Places/getReadableAddress')
app.post('/address/readable', async (req, res) => {
    const check = checkAppSecret(req.body.appSecret)
    if (check) {
        res.status(400).send({
            status: 400,
            message: 'Invalid Request'
        })
        return
    }
    const latitude = req.body.location.latitude
    const longitude = req.body.location.longitude
    const response = await getReadableAddress(latitude, longitude)
    res.status(response.status).send(response)
})

const getCoordinatesFromAddress = require('./Places/getCoordinates')
app.post('/address/coordinates', async (req, res) => { 
    const check = checkAppSecret(req.body.appSecret)
    if (check) {
        res.status(400).send({
            status: 400,
            message: 'Invalid Request'
        })
        return
    }
    const address = req.body.address
    const response = await getCoordinatesFromAddress(address)
    res.status(response.status).send(response)
})

const getSuggestions = require('./Places/getSuggestions')
app.post('/address/suggestions', (req, res) => {
    const check = checkAppSecret(req.body.appSecret)
    if (check) {
        res.status(400).send({
            status: 400,
            message: 'Invalid Request'
        })
        return
    }
    const partialAddress = req.body.partialAddress
    const response = getSuggestions(partialAddress)
    res.status(response.status).send(response)
})

const getNearbyPlaces = require('./Places/getNearbyPlaces')
app.post('/places/nearby', async (req, res) => {
    const check = checkAppSecret(req.body.appSecret)
    if (check) {
        res.status(400).send({
            status: 400,
            message: 'Invalid Request'
        })
        return
    }
    const latitude = req.body.location.latitude
    const longitude = req.body.location.longitude
    const response = await getNearbyPlaces(latitude, longitude)
    res.status(response.status).send(response)
})

const getNewPlaces = require('./Places/getNewPlaces')
app.post('/places/new', async (req, res) => {
    const check = checkAppSecret(req.body.appSecret)
    if (check) {
        res.status(400).send({
            status: 400,
            message: 'Invalid Request'
        })
        return
    }
    const latitude = req.body.location.latitude
    const longitude = req.body.location.longitude
    const startIndex = req.body.startIndex
    const finishIndex = req.body.finishIndex
    const response = await getNewPlaces(latitude, longitude, startIndex, finishIndex)
    res.status(response.status).send(response)
})

const getTrendingPlaces = require('./Places/getTrendingPlaces')
app.post('/places/trending', async (req, res) => {
    const check = checkAppSecret(req.body.appSecret)
    if (check) {
        res.status(400).send({
            status: 400,
            message: 'Invalid Request'
        })
        return
    }
    const startIndex = req.body.startIndex
    const finishIndex = req.body.finishIndex
    const response = await getTrendingPlaces(startIndex, finishIndex)
    res.status(response.status).send(response)
})

const getBusinessProfile = require('./Places/getBusinessProfile')
app.post('/search/place', async (req, res) => {
    const check = checkAppSecret(req.body.appSecret)
    if (check) {
        res.status(400).send({
            status: 400,
            message: 'Invalid Request'
        })
        return
    }
    const placeID = req.body.id
    const response = await getBusinessProfile(placeID)
    res.status(response.status).send(response)
})

const getCatagoryOrder = require('./Places/getCategoryOrder')
app.post('/categories/order', async (req, res) => {
    const check = checkAppSecret(req.body.appSecret)
    if (check) {
        res.status(400).send({
            status: 400,
            message: 'Invalid Request'
        })
        return
    }
    const userID = req.body.id
    const response = await getCatagoryOrder(userID)
    res.status(response.status).send(response)
})

const saveCategoryOrder = require('./Places/saveCategoryOrder')
app.post('/categories/saveOrder', async (req, res) => {
    const check = checkAppSecret(req.body.appSecret)
    if (check) {
        res.status(400).send({
            status: 400,
            message: 'Invalid Request'
        })
        return
    }
    const userID = req.body.id
    const categories = req.body.categories
    const response = await saveCategoryOrder(userID, categories)
    res.status(response.status).send(response)
})