const express = require('express')
const app = express()

const connect = require('./config/auth').connect

const User = require('./model/User')
const Place = require('./model/Place')
const Review = require('./model/Review')
const checkAppSecret = require('./permissions/checkAppSecret')
const checkAccessToken = require('./permissions/checkAccessToken')

app.use(express.json())

const port = process.env.PORT || 8090

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
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
        res.status(400).send({
            status: 400,
            message: 'Invalid Request'
        })
        return
    }
    const phoneNumber = req.body.phoneNumber
    const password = req.body.password
    const response = await signUpUsingPhone(phoneNumber, password)
    res.status(response.status).send(response)
})

const signUpUsingFacebook = require('./Sign_Up/signUpUsingFacebook')
app.post('/signup/facebook', async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
        res.status(400).send({
            status: 400,
            message: 'Invalid Request'
        })
        return
    }
    const facebookToken = req.body.facebookToken
    const response = await signUpUsingFacebook(facebookToken)
    res.status(response.status).send(response)
})

const loginPhone = require('./Login/loginUsingPhone')
app.post('/login/phone', async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
        res.status(400).send({
            status: 400,
            message: 'Invalid Request'
        })
        return
    }
    const phoneNumber = req.body.phoneNumber
    const password = req.body.password
    const response = await loginPhone(phoneNumber, password)
    res.status(response.status).send(response)

})

const loginFacebook = require('./Login/loginUsingFacebook')
app.post('/login/facebook', async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
        res.status(400).send({
            status: 400,
            message: 'Invalid Request'
        })
        return
    }
    const facebookToken = req.body.facebookToken
    const response = await loginFacebook(facebookToken)
    res.status(response.status).send(response)
})

const getReadableAddress = require('./Places/getReadableAddress')
app.post('/address/readable', async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
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
            message: "Unable to find your location"
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
    const latitude = req.body.location.latitude
    const longitude = req.body.location.longitude
    const response = await getReadableAddress(latitude, longitude)
    res.status(response.status).send(response)
})

const getCoordinatesFromAddress = require('./Places/getCoordinates')
app.post('/address/coordinates', async (req, res) => { 
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
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
    const address = req.body.address
    const response = await getCoordinatesFromAddress(address)
    res.status(response.status).send(response)
})

const getSuggestions = require('./Places/getSuggestions')
app.post('/address/suggestions', (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
        res.status(400).send({
            status: 400,
            message: 'Invalid Request'
        })
        return
    }
    const partialAddress = req.body.partialAddress
    if (req.body.numberOfSuggestions == undefined) {
        res.status(400).send({
            status: 400,
            message: "Please enter amount"
        })
    }
    const numberOfSuggestions = req.body.numberOfSuggestions
    const response = getSuggestions(partialAddress, numberOfSuggestions)
    res.status(response.status).send(response)
})

const getNearbyPlaces = require('./Places/getNearbyPlaces')
app.post('/places/nearby', async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
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
    const latitude = req.body.location.latitude
    const longitude = req.body.location.longitude
    const response = await getNearbyPlaces(latitude, longitude)
    res.status(response.status).send(response)
})

const getNewPlaces = require('./Places/getNewPlaces')
app.post('/places/new', async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
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
    const latitude = req.body.location.latitude
    const longitude = req.body.location.longitude
    const startIndex = req.body.startIndex
    const finishIndex = req.body.finishIndex
    const response = await getNewPlaces(check.id, latitude, longitude, startIndex, finishIndex)
    res.status(response.status).send(response)
})

const getTrendingPlaces = require('./Places/TrendingPlaces')
app.post('/places/trending', async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
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
    const startIndex = req.body.startIndex
    const finishIndex = req.body.finishIndex
    const response = await getTrendingPlaces(check.id, startIndex, finishIndex)
    res.status(response.status).send(response)
})

const getBusinessProfile = require('./Places/getBusinessProfile')
app.post('/search/place', async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
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

const getCatagoryOrder = require('./Profile/getCategoryOrder')
app.post('/categories/order', async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
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

const saveCategoryOrder = require('./Profile/saveCategoryOrder')
app.post('/categories/saveOrder', async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
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
    const categories = req.body.categories
    const response = await saveCategoryOrder(userID, categories)
    res.status(response.status).send(response)
})

const searchPlaces = require('./Places/searchPlaces')
app.post('/search/places', async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
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

    var filters = null
    if (typeof req.body.filters == 'undefined') {
        filters = null
    } else {
        filters = req.body.filters
    }
    const latitude = req.body.location.latitude
    const longitude = req.body.location.longitude
    const response = await searchPlaces(latitude, longitude, filters, check.id)
    res.status(response.status).send(response)
})

const searchSuggestions = require('./Places/searchSuggestions')
app.post('/search/suggestions', async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
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

    const partialName = req.body.partialName
    const numberOfSuggestions = req.body.numberOfSuggestions
    const response = await searchSuggestions(partialName, numberOfSuggestions)
    res.status(response.status).send(response)
})

const addBookmark = require('./Places/addBookmark')
app.post('/bookmarks/add', async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
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
    const placeID = req.body.id
    const response = await addBookmark(check.id, placeID)
    res.status(response.status).send(response)
})

const removeBookmark = require('./Places/removeBookmark')
app.post('/bookmarks/remove', async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
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
    const placeID = req.body.id
    const response = await removeBookmark(check.id, placeID)
    res.status(response.status).send(response)
})

const rate = require('./Places/rate')
app.post('/rate', async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
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
    const placeID = req.body.id
    const userID = check.id
    const rating = req.body.rating
    const response = await rate(placeID, userID, rating)
    res.status(response.status).send(response)
})

const like = require('./Reviews/like')
app.post('/review/like', async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
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
    const reviewID = req.body.id
    const userID = check.id
    const response = await like(reviewID, parseInt(userID))
    res.status(response.status).send(response)
})

const searchPerson = require('./User/searchPerson')
app.post('/search/person', async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
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
    const id = req.body.id
    const response = await searchPerson(id)
    res.status(response.status).send(response)
})

const getReview = require('./Reviews/getReview')
app.post('/review', async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
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
    const id = req.body.id
    const response = await getReview(id, check.id)
    res.status(response.status).send(response)
})

const addReview = require('./Reviews/addReview')
app.post('/review/add', async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
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