const Place = require('../model/Place')
const connect = require('../config/auth').connect
const axios = require('axios')
const URLSearchParams = require('url').URLSearchParams
const versionController = require('./versionController')
const checkZeilaToken = require('./checkUser')
const Places = require('../__mocks__/Places')
const getDistance = require('./fakedGetLocation').getDistance

const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
const parameters = {
    client_id: 'VBJIHMIS22N50XBQL1TXJEA4D5DEBNNAD0Q2MXKSETGFDLM2',
    client_secret: 'PUL5IKQY4DABKD3JGLKU5MDUP1RWHLUDD4H3BLN3Z2LA5XRK',
    ll: null,
    v: versionController(),
    radius: null,
    query: null,
    intent: "browse"
}

connect()

var place = {
    placeID: null,
    placeName: null,
    placeType: null,
    placeLocation: {
        latitude: null,
        longitude: null
    }
}

function getNearestLocation(latitude, longitude) {
    let smallest = getDistance(latitude, Places[0].latitude, longitude, Places[0].longitude)
    let index = 0
    let distance = 0
    for (var i = 0; i < Places.length; ++i) {
        distance = getDistance(latitude, Places[i].latitude, longitude, Places[i].longitude)
        if (smallest > distance) {
            smallest = distance
            index = i
        }
    }

    return Places[index]
}


async function addPlace(latitude, longitude, placeType, area) {
    parameters.ll = "" + latitude + ", " + longitude
    parameters.query = placeType
    parameters.radius = Math.round(Math.sqrt(area / Math.PI) * 1000)
    console.log("Radius: " + parameters.radius)
    return await axios.get(endPoint + new URLSearchParams(parameters))
            .then(async info => {
                const groups = info.data.response.groups
                var placesFound = groups[0].items
                var checkIfExists = null
                var newPlace = null
                for (let i = 0; i < placesFound.length; ++i) {
                    checkIfExists = null
                    newPlace = new Place()
                    newPlace.placeID = await Place.countDocuments() + 1
                    newPlace.fourSquareID = placesFound[i].venue.id
                    newPlace.placeName = placesFound[i].venue.name
                    newPlace.placeType = placeType
                    newPlace.placeOverview = null
                    newPlace.placeRating = null
                    newPlace.placeNumberOfRatings = null
                    newPlace.placeLocation.latitude = placesFound[i].venue.location.lat,
                    newPlace.placeLocation.longitude = placesFound[i].venue.location.lng
                    checkIfExists = await Place.findOne( { fourSquareID: newPlace.fourSquareID } )
                    if (checkIfExists == null) {
                        const confirmSave = await newPlace.save()
                        if (confirmSave != null) {
                            console.log(confirmSave.placeName + " Added")
                        } else {
                            console.log("Error Occured")
                        }
                    } else {
                        console.log(checkIfExists.placeName + " Already Exists")
                    }
                }
            })
            .catch(err => {
                console.log("Invalid Query")
            })
}

module.exports = addPlace