const express = require('express')
const app = express()

const signUpUsingPhone = require('./Sign_Up/signUpUsingPhone')
const signUpUsingFacebook = require('./Sign_Up/signUpUsingFacebook')
const loginPhone = require('./Login/loginUsingPhone')
const loginFacebook = require('./Login/loginUsingFacebook')

const getLocation = require('./Places/getLocation')
const fetchPlaces = require('./Places/fetchPlacesByCatagory')

app.use(express.json())

const port = process.env.PORT || 8081

app.listen(port, () => console.log("Server Running on *:8081"))


app.get('/', (req, res) => {
    res.send("This server is working")
})

app.get('/whereami', async (req, res) => { 
    const coordinates = {
        latitude: req.body.latitude,
        longitude: req.body.longitude
    }
    const response = await getLocation(coordinates)
    res.status(response.status).send(response)
})

app.get('/fetchPlaces', async (req, res) => {
    const catagory = req.body.catagory
    const response = await fetchPlaces(catagory)
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