const axios = require('axios')
const URLSearchParams = require('url').URLSearchParams
const versionController = require('./versionController')
const checkZeilaToken = require('./checkUser')

const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
const parameters = {
    client_id: 'VBJIHMIS22N50XBQL1TXJEA4D5DEBNNAD0Q2MXKSETGFDLM2',
    client_secret: 'PUL5IKQY4DABKD3JGLKU5MDUP1RWHLUDD4H3BLN3Z2LA5XRK',
    ll: null,
    v: versionController(),
    radius: 2000,
    query: null
}

const catagories = [
    'restaurant', 'event', 'garage', 'hospital', 'bar', 'park', 'gym', 'pharmacy'
]

function checkCatagory(catagory) {
    const index = catagories.indexOf(catagory)
    if (index === -1) {
        return true
    }
    else {
        return false
    }
}

async function fetchPlacesByCatagory(zeilaToken, coordinates, catagory) {
    if (checkZeilaToken(zeilaToken)) {
        return {
            status: 400,
            message: "Invalid Request"
        }
    }
    if (coordinates.latitude == null || coordinates.longitude == null) {
        return {
            status: 400,
            message: "Unable to fetch location"
        }
    }

    parameters.ll = '' + coordinates.latitude + ', ' + coordinates.longitude

    if (checkCatagory(catagory)) {
        console.log("Invalid Catagory")
        return {
            status: 400,
            message: "Invalid Catagory, choose catagory from " + catagories
        }
    }
    parameters.query = catagory
    var venues = []
    return await axios.get(endPoint + new URLSearchParams(parameters))
            .then(info => {
                const groups = info.data.response.groups
                const places = groups[0].items
                for(var i = 0; i < places.length; i++) {
                    venues.push(places[i].venue)
                }
                return {
                    status: 200,
                    count: venues.length
                }
            })
            .catch(err => {
                return {
                    status: 400,
                    message: "Error Has Occured"
                }
            })
}

module.exports = fetchPlacesByCatagory