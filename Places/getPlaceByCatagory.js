const Place = require('../model/Place')
const checkZeilaToken = require('./checkUser')
const connect = require('../config/auth').connect
connect()

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

async function getPlaces(latitude, longitude, catagory) {
    var radius = 3000
    var distance = null
    var count = 0
    var places = []
    var place = null
    const allPlaces = await Place.find({ placeType: catagory })
    for (let i = 0; i < allPlaces.length; ++i) {
        place = {}
        distance = calculateDistance(latitude, longitude, allPlaces[i].placeLocation.latitude, allPlaces[i].placeLocation.longitude)
        place.name = allPlaces[i].placeName
        place.overview = allPlaces[i].placeType
        place.proximity = distance
        place.ratings = 0
        place.numberOfRatings = 0
        places.push(place)
    }

    return places
}

async function getPlacesByCatagory(accessToken, latitude, longitude, catagory) {
    
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
    const catagories = [
        'Restaurants', 'Events', 'Garages', 'Hospitals', 'Bars', 'Parks', 'Gyms', 'Pharmacies'
    ]

    const checkCatagory = catagories.find(item => item.toLocaleLowerCase() === catagory.toLocaleLowerCase())
    if (checkCatagory == null) {
        return {
            status: 400,
            message: "Could Not Find The Catagory."
        }
    }
    const places = await getPlaces(latitude, longitude, catagory)
    return {
        status: 200,
        places: places
    }

}

module.exports = getPlacesByCatagory