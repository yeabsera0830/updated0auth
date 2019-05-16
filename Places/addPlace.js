const Place = require('../model/Place')
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
    radius: 2000,
    query: null
}

async function getNearestLocation(latitude, longitude) {
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
    console.log(Places[index])
    return {
        minor: Places[index].minor,
        major: Places[index].major
    }

}

async function addPlace(latitude, longitude, placeType) {
    parameters.ll = "" + latitude + ", " + longitude
    parameters.query = placeType
    var place = {
        placeID: null,
        placeName: null,
        placeLocation: {
            latitude: null,
            longitude: null
        },
        placeMinor: null,
        placeMajor: null
    }
    venues = []
    //console.log(getNearestLocation(latitude, longitude))
    await axios.get(endPoint + new URLSearchParams(parameters))
            .then(info => {
                const groups = info.data.response.groups
                var venue = groups[0].items[0].venue
                place.placeID = venue.id
                place.placeName = venue.name
                place.placeLocation.latitude = venue.location.lat
                place.placeLocation.longitude = venue.location.lng
                var foundPlace = getNearestLocation(place.placeLocation.latitude, place.placeLocation.longitude)
                place.placeMinor = foundPlace.minor
                place.placeMajor = foundPlace.major
                console.log(place)
            })
            .catch(err => {
                console.log("Invalid Query")
            })
}

module.exports = addPlace