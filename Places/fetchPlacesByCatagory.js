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

function checkCatagory(catagory) {
    const index = catagories.indexOf(catagory)
    if (index === -1) {
        return true
    }
    else {
        return false
    }
}

async function getAmount(placeType) {
    parameters.query = placeType
    return await axios.get(endPoint + new URLSearchParams(parameters))
            .then(info => {
                const groups = info.data.response.groups
                const places = groups[0].items
                return places.length
            })
            .catch(err => {
                return "Invalid Query"
            })
}

async function fetchPlacesByCatagory(accessToken, coordinates) {
    const check = await checkZeilaToken(accessToken)
    if (check) {
        return {
            status: 400,
            message: "Unable to fetch places"
        }
    }
    if (coordinates == null || coordinates.latitude == null || coordinates.longitude == null || typeof coordinates.latitude == "string" || typeof coordinates.longitude == "string") {
        return {
            status: 400,
            message: "Unable to fetch places"
        }
    }

    parameters.ll = '' + coordinates.latitude + ', ' + coordinates.longitude
    var venues = []
    var places = {
        "Restaurants": null,
        "Events": null,
        "Garages": null,
        "Hospitals": null,
        "Bars": null,
        "Parks": null,
        "Gyms": null,
        "Pharmacies": null
    }
    const catagories = [
        'Restaurants', 'Events', 'Garages', 'Hospitals', 'Bars', 'Parks', 'Gyms', 'Pharmacies'
    ]
    for (let i = 0; i < catagories.length; ++i) {
        places[catagories[i]] = await getAmount(catagories[i])
    }

    return {
        status: 200,
        places: places
    }
}

module.exports = fetchPlacesByCatagory