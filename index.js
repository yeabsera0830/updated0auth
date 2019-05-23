const express = require('express')
const app = express()

const connect = require('./config/auth').connect
const User = require('./model/User')
const Place = require('./model/Place')
const signUpUsingPhone = require('./Sign_Up/signUpUsingPhone')
const signUpUsingFacebook = require('./Sign_Up/signUpUsingFacebook')
const loginPhone = require('./Login/loginUsingPhone')
const loginFacebook = require('./Login/loginUsingFacebook')

const getReadableAddress = require('./Places/getReadableAddress')
const getCoordinatesFromAddress = require('./Places/getCoordinates').getCoordinates
const getNearbyPlaces = require('./Places/getNearbyPlaces')
const getSuggestions = require('./Places/getSuggestion')
const getNewPlaces = require('./Places/getNewPlaces')
const getPlaceScreen = require('./Places/getPlaceScreen')
const getPlacesByCatagory = require('./Places/getPlaceByCatagory')

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


app.post('/signup/phone', async (req, res) => {
    const phoneNumber = req.body.phoneNumber
    const password = req.body.password
    const response = await signUpUsingPhone(phoneNumber, password)
    res.status(response.status).send(response)
})

app.post('/signup/facebook', async (req, res) => {
    const facebookToken = req.body.facebookToken
    const response = await signUpUsingFacebook(facebookToken)
    res.status(response.status).send(response)
})

app.post('/login/phone', async (req, res) => {
    const phoneNumber = req.body.phoneNumber
    const password = req.body.password
    const response = await loginPhone(phoneNumber, password)
    res.status(response.status).send(response)

})

app.post('/login/facebook', async (req, res) => {
    const facebookToken = req.body.facebookToken
    const response = await loginFacebook(facebookToken)
    res.status(response.status).send(response)
})

app.post('/getReadableAddress', async (req, res) => { 
    const accessToken = req.body.accessToken
    const latitude = req.body.location.latitude
    const longitude = req.body.location.longitude
    const response = await getReadableAddress(accessToken, latitude, longitude)
    res.status(response.status).send(response)
})

app.post('/getCoordinatesFromAddress', async (req, res) => { 
    const accessToken = req.body.accessToken
    const address = req.body.address
    const response = await getCoordinatesFromAddress(accessToken, address)
    res.status(response.status).send(response)
})

app.post('/getNearbyPlaces', async (req, res) => {
    const accessToken = req.body.accessToken
    const latitude = req.body.location.latitude
    const longitude = req.body.location.longitude
    const response = await getNearbyPlaces(accessToken, latitude, longitude)
    res.status(response.status).send(response)
})

app.post('/getSuggestionsFromPartialAddress', (req, res) => {
    const partialAddress = req.body.partialAddress
    const response = getSuggestions(partialAddress)
    res.status(response.status).send(response)
})

app.post('/getNewPlaces', async (req, res) => {
    const accessToken = req.body.accessToken
    const latitude = req.body.location.latitude
    const longitude = req.body.location.longitude
    const startIndex = req.body.startIndex
    const finishIndex = req.body.finishIndex
    const response = await getNewPlaces(accessToken, latitude, longitude, startIndex, finishIndex)
    res.status(response.status).send(response)
})

app.post('/getPlaceScreen', async (req, res) => {
    const accessToken = req.body.accessToken
    const placeID = req.body.placeID
    const response = await getPlaceScreen(accessToken, placeID)
    res.status(response.status).send(response)
})

app.post('/getPlacesByCatagory', async (req, res) => {
    const accessToken = req.body.accessToken
    const latitude = req.body.location.latitude
    const longitude = req.body.location.longitude
    const catagory = req.body.catagory
    const response = await getPlacesByCatagory(accessToken, latitude, longitude, catagory)
    res.status(response.status).send(response)
})