const axios = require('axios')
const URLSearchParams = require('url').URLSearchParams
const versionController = require('./versionController')

const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
let parameters = {
    client_id: 'VBJIHMIS22N50XBQL1TXJEA4D5DEBNNAD0Q2MXKSETGFDLM2',
    client_secret: 'PUL5IKQY4DABKD3JGLKU5MDUP1RWHLUDD4H3BLN3Z2LA5XRK',
    ll: null,
    v: versionController(),
    radius: 2000,
    query: 'bar'
}

let distance
async function getLocation(coordinates) {
    if (coordinates.latitude == null || coordinates.longitude == null) {
        return {
            status: 400,
            message: "Unable to fetch location"
        }
    }

    parameters.ll = '' + coordinates.latitude + ', ' + coordinates.longitude
    return await axios.get(endPoint + new URLSearchParams(parameters))
        .then(info => {
            const places = info.data.response.groups[0].items
            let smallest = places[0].venue.location.distance
            var location = places[0].venue.location
        
            for (var i = 0; i < places.length; ++i) {
                distance = places[i].venue.location.distance
                if (smallest > distance) {
                    smallest = distance
                    location = places[i].venue.location
                }
            }

            const yourPlace = {
                address: location.address,
                crossStreet: location.crossStreet,
                countryCode: location.cc,
                city: location.city,
                state: location.state,
                country: location.country,
                formattedAddress: location.formattedAddress[0]
            }
            return {
                status: 200,
                value: yourPlace
            }
            
        })
}

module.exports = getLocation