const express = require('express')
const app = express()

const connect = require('./config/auth').connect
const User = require('./model/User')
const signUpUsingPhone = require('./Sign_Up/signUpUsingPhone')
const signUpUsingFacebook = require('./Sign_Up/signUpUsingFacebook')
const loginPhone = require('./Login/loginUsingPhone')
const loginFacebook = require('./Login/loginUsingFacebook')

const getNearestPlace = require('./Places/fakedGetLocation').getNearestPlace
const getCoordinates = require('./Places/fakedGetLocation').getCoordinates
const fetchPlaces = require('./Places/fetchPlacesByCatagory')

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

app.post('/getReadableAddress', async (req, res) => { 
    const accessToken = req.body.accessToken
    const latitude = req.body.latitude
    const longitude = req.body.longitude
    const response = await getNearestPlace(accessToken, latitude, longitude)
    res.status(response.status).send(response)
})

app.post('/getCoordinatesFromAddress', async (req, res) => { 
    const accessToken = req.body.accessToken
    const major = req.body.major
    const minor = req.body.minor
    const response = await getCoordinates(accessToken, major, minor)
    res.status(response.status).send(response)
})

app.post('/getNearbyPlaces', async (req, res) => {
    const accessToken = req.body.accessToken
    const coordinates = req.body.location
    const response = await fetchPlaces(accessToken, coordinates)
    res.status(response.status).send(response)
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