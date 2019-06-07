const express = require('express')
const app = express()

const connect = require('./config/auth').connect

const User = require('./model/User')
const Place = require('./model/Place')
const Review = require('./model/Review')
const checkAppSecret = require('./permissions/checkAppSecret')
const checkAccessToken = require('./permissions/checkAccessToken')

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
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
        })
        return
    }

    if (req.body.phoneNumber == null || req.body.phoneNumber == undefined || req.body.password == null || req.body.password == undefined) {
        res.status(400).send({
            status: 400,
            message: "Could not sign up user"
        })
        return
    }


    const phoneNumber = req.body.phoneNumber
    const password = req.body.password

    if (phoneNumber.length < 10) {
        res.status(400).send({
            status: 400,
            message: "Please send a valid phone number"
        })
        return
    }

    if (password.length < 8) {
        res.status(400).send({
            status: 400,
            message: "Minimum password length is eight characters"
        })
        return
    } 

    const response = await signUpUsingPhone(phoneNumber, password)
    res.status(response.status).send(response)
})

const signUpUsingFacebook = require('./Sign_Up/signUpUsingFacebook')
app.post('/signup/facebook', async (req, res) => {
    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
        })
        return
    }

    if (req.body.facebookToken == null || req.body.facebookToken == undefined) {
        res.status(400).send({
            status: 400,
            message: "Could not sign up user"
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
            message: "Invalid Request"
        })
        return
    }

    if (req.body.phoneNumber == null || req.body.phoneNumber == undefined || req.body.password == null || req.body.password == undefined) {
        res.status(400).send({
            status: 400,
            message: "Could not sign in user"
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
            message: "Invalid Request"
        })
        return
    }
    if (req.body.facebookToken == null || req.body.facebookToken == undefined) {
        res.status(400).send({
            status: 400,
            message: "Could not sign in user"
        })
        return
    }
    const facebookToken = req.body.facebookToken
    const response = await loginFacebook(facebookToken)
    res.status(response.status).send(response)
})

const getReadableAddress = require('./Places/getReadableAddress')
app.post('/address/readable', async (req, res) => {
    if (req.body.appSecret == null || req.body.appSecret == undefined || req.body.accessToken == null || req.body.accessToken == undefined) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
        })
        return
    }

    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
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

    if (req.body.location.latitude == null || req.body.location.latitude == undefined || req.body.location.longitude == null || req.body.location.longitude == null) {
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
    if (req.body.appSecret == null || req.body.appSecret == undefined || req.body.accessToken == null || req.body.accessToken == undefined) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
        })
        return
    }

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

    if (req.body.address == null || req.body.address == undefined) {
        res.status(400).send({
            status: 400,
            message: "Could not find address"
        })
        return
    }

    const address = req.body.address
    const response = await getCoordinatesFromAddress(address)
    res.status(response.status).send(response)
})

const getSuggestions = require('./Places/getSuggestions')
app.post('/address/suggestions', (req, res) => {
    if (req.body.appSecret == null || req.body.appSecret == undefined) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
        })
        return
    }

    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
        })
        return
    }
    if (req.body.partialAddress == null || req.body.partialAddress == undefined) {
        res.status(400).send({
            status: 400,
            message: "Please send me the partial address"
        })
        return
    }
    const partialAddress = req.body.partialAddress
    const response = getSuggestions(partialAddress)
    res.status(response.status).send(response)
})

const getNearbyPlaces = require('./Places/getNearbyPlaces')
app.post('/places/nearby', async (req, res) => {
    if (req.body.appSecret == null || req.body.appSecret == undefined || req.body.accessToken == null || req.body.accessToken == undefined) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
        })
        return
    }

    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
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

    if (req.body.location == null || req.body.location == undefined) {
        res.status(400).send({
            status: 400,
            message: "Please send me a correct location"
        })
        return
    }

    if (req.body.location.latitude == null || req.body.location.latitude == undefined || req.body.location.longitude == null || req.body.location.longitude == undefined) {
        res.status(400).send({
            status: 400,
            message: "Please send me the coordinates with the right format"
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
    if (req.body.appSecret == null || req.body.appSecret == undefined || req.body.accessToken == null || req.body.accessToken == undefined) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
        })
        return
    }

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
    if (req.body.location == null || req.body.location == undefined) {
        res.status(400).send({
            status: 400,
            message: "Please send me a correct location"
        })
        return
    }

    if (req.body.location.latitude == null || req.body.location.latitude == undefined || req.body.location.longitude == null || req.body.location.longitude == undefined) {
        res.status(400).send({
            status: 400,
            message: "Please send me the coordinates with the right format"
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
    if (req.body.appSecret == null || req.body.appSecret == undefined || req.body.accessToken == null || req.body.accessToken == undefined) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
        })
        return
    }

    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
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

    if (req.body.startIndex == null || req.body.startIndex == undefined || req.body.finishIndex || req.body.finishIndex == undefined) {
        res.status(400).send({
            status: 400,
            message: "Unable to get places"
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
    if (req.body.appSecret == null || req.body.appSecret == undefined || req.body.accessToken == null || req.body.accessToken == undefined) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
        })
        return
    }

    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
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

    if (req.body.id == null || req.body.id == undefined) {
        res.status(400).send({
            status: 400,
            message: "Unable to get place"
        })
        return
    }

    const placeID = req.body.id
    const response = await getBusinessProfile(placeID)
    res.status(response.status).send(response)
})

const getCatagoryOrder = require('./Profile/getCategoryOrder')
app.post('/categories/order', async (req, res) => {
    if (req.body.appSecret == null || req.body.appSecret == undefined || req.body.accessToken == null || req.body.accessToken == undefined) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
        })
        return
    }

    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
        })
        return
    }
    const check = await checkAccessToken(req.body.accessToken)
    if (check == null) {
        res.status(400).send({
            status: 400,
            message: "Unable to get categories"
        })
        return
    }
    const userID = check.id
    const response = await getCatagoryOrder(userID)
    res.status(response.status).send(response)
})

const saveCategoryOrder = require('./Profile/saveCategoryOrder')
app.post('/categories/saveOrder', async (req, res) => {
    if (req.body.appSecret == null || req.body.appSecret == undefined || req.body.accessToken == null || req.body.accessToken == undefined) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
        })
        return
    }

    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
        })
        return
    }
    const check = await checkAccessToken(req.body.accessToken)
    if (check == null) {
        res.status(400).send({
            status: 400,
            message: "Unable to save categories"
        })
        return
    }

    if (req.body.categories == null || req.body.categories == undefined) {
        res.status(400).send({
            status: 400,
            message: "Unable to save categories"
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
    if (req.body.appSecret == null || req.body.appSecret == undefined || req.body.accessToken == null || req.body.accessToken == undefined) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
        })
        return
    }

    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
        })
        return
    }
    const check = await checkAccessToken(req.body.accessToken)
    if (check == null) {
        res.status(400).send({
            status: 400,
            message: "Unable to search for places"
        })
        return
    }
    if (req.body.location == null || req.body.location == undefined) {
        res.status(400).send({
            status: 400,
            message: "Unable to search for places"
        })
        return
    }

    if (req.body.location.latitude == null || req.body.location.latitude == undefined || req.body.location.longitude == null || req.body.location.longitude == undefined) {
        res.status(400).send({
            status: 400,
            message: "Unable to search for places"
        })
        return
    }

    if (req.body.filter == null || req.body.filter == undefined) {
        res.status(400).send({
            status: 400,
            message: "Unable to seach for places"
        })
        return
    }

    const latitude = req.body.location.latitude
    const longitude = req.body.location.longitude
    const filter = req.body.filter
    const response = await searchPlaces(latitude, longitude, filter)
    res.status(response.status).send(response)
})

const searchSuggestions = require('./Places/searchSuggestions')
app.post('/search/suggestions', async (req, res) => {
    if (req.body.appSecret == null || req.body.appSecret == undefined || req.body.accessToken == null || req.body.accessToken == undefined) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
        })
        return
    }

    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
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

    if (req.body.partialName == null || req.body.partialName == undefined) {
        res.status(400).send({
            status: 400,
            message: "Unable to get places"
        })
        return
    }

    const partialName = req.body.partialName
    const response = await searchSuggestions(partialName)
    res.status(response.status).send(response)
})

const addBookmark = require('./Places/addBookmark')
app.post('/bookmarks/add', async (req, res) => {
    if (req.body.appSecret == null || req.body.appSecret == undefined || req.body.accessToken == null || req.body.accessToken == undefined) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
        })
        return
    }

    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
        })
        return
    }
    const check = await checkAccessToken(req.body.accessToken)
    if (check == null) {
        res.status(400).send({
            status: 400,
            message: "Unable to find place"
        })
        return
    }

    if (req.body.id == null || req.body.id == undefined) {
        res.status(400).send({
            status: 400,
            message: "Please send me the place ID"
        })
        return
    }

    const placeID = req.body.id
    const response = await addBookmark(check.id, placeID)
    res.status(response.status).send(response)
})

const removeBookmark = require('./Places/removeBookmark')
app.post('/bookmarks/remove', async (req, res) => {
    if (req.body.appSecret == null || req.body.appSecret == undefined || req.body.accessToken == null || req.body.accessToken == undefined) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
        })
        return
    }

    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
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
    
    if (req.body.id == null || req.body.id == undefined) {
        res.status(400).send({
            status: 400,
            message: "Please send me the place ID"
        })
        return
    }

    const placeID = req.body.id
    const response = await removeBookmark(check.id, placeID)
    res.status(response.status).send(response)
})

const rate = require('./Places/rate')
app.post('/rate', async (req, res) => {
    if (req.body.appSecret == null || req.body.appSecret == undefined || req.body.accessToken == null || req.body.accessToken == undefined) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
        })
        return
    }

    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
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

    if (req.body.id == null || req.body.id == undefined) {
        res.status(400).send({
            status: 400,
            message: "Please send me the place ID"
        })
        return
    }

    if (req.body.rating == null || req.body.rating == undefined) {
        res.status(400).send({
            status: 400,
            message: "Please send me the ratings"
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
app.post('/like', async (req, res) => {
    if (req.body.appSecret == null || req.body.appSecret == undefined || req.body.accessToken == null || req.body.accessToken == undefined) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
        })
        return
    }

    const checkSecret = checkAppSecret(req.body.appSecret)
    if (checkSecret) {
        res.status(400).send({
            status: 400,
            message: "Invalid Request"
        })
        return
    }
    const check = await checkAccessToken(req.body.accessToken)
    if (check == null) {
        res.status(400).send({
            status: 400,
            message: "Unable to find the place"
        })
        return
    }

    if (req.body.id == null || req.body.id == undefined) {
        res.status(400).send({
            status: 400,
            message: "Please send me the review ID"
        })
        return
    }

    const reviewID = req.body.id
    const userID = check.id
    const response = await like(reviewID, parseInt(userID))
    res.status(response.status).send(response)
})