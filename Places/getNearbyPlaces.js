const Place = require('../model/Place')
const checkZeilaToken = require('./checkUser')

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) * 111000
}

async function getAmount(latitude, longitude, catagory) {
    var radius = 3000
    var distance = null
    var count = 0
    return await Place.find({ placeType: catagory })
            .then(allPlaces => {
                for (let i = 0; i < allPlaces.length; ++i) {
                    distance = calculateDistance(latitude, longitude, allPlaces[i].placeLocation.latitude, allPlaces[i].placeLocation.longitude)
                    if (distance < radius) {
                        count++
                    }
                }
                return count
            })
}

async function getNearbyPlaces(accessToken, latitude, longitude) {
    const check = await checkZeilaToken(accessToken)
    if (check) {
        return {
            status: 400,
            message: "Unable to get places"
        }
    }

    if (typeof latitude == 'string' || typeof longitude == 'string' || latitude == null || longitude == null ) {
        return {
            status: 400,
            message: "Unable to get places"
        }
    }

    var places = {}
    const catagories = [
        'restaurant', 'events', 'garage', 'hospital', 'bar', 'park', 'gym', 'pharmacy'
    ]
    var amount = 0
    for (let i = 0; i < catagories.length; ++i) {
        amount = await getAmount(latitude, longitude, catagories[i])
        if (amount > 0) {
            places[catagories[i]] = amount
        }
        amount = 0
    }

    return {
        status: 200,
        places: places
    }

}


module.exports = getNearbyPlaces