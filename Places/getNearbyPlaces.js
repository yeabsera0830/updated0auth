const Place = require('../model/Place')

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) * 111000
}

async function getAmount(latitude, longitude, category) {
    category = parseInt(category)
    var radius = 3000
    var distance = null
    var count = 0
    const allPlaces = await Place.find({ placeCategory: category })
    allPlaces.forEach(place => {
        distance = calculateDistance(latitude, longitude, place.placeLocation.latitude, place.placeLocation.longitude)
        if (distance < radius) {
            count++
        }
    })
    return count
}

async function getNearbyPlaces(latitude, longitude) {
    if (typeof latitude == 'string' || typeof longitude == 'string' || latitude == null || longitude == null ) {
        return {
            status: 400,
            message: "Unable to get places"
        }
    }
    const catagories = ['restaurant', 'event', 'garage', 'hospital', 'bar', 'park', 'gym', 'pharmacy', 'hotel', 'icecream', 'cafe', 'guest house', 'pastry']
    const catagoryValue = {
        restaurant: 1,
        bar: 2,
        hospital: 3,
        gym: 4,
        pharmacy: 5,
        garage: 6,
        park: 7,
        event: 8,
        hotel: 9,
        icecream: 10,
        cafe: 11,
        'guest house': 12,
        pastry: 13,
    }

    var places = {}
    var amount = 0
    for (let i = 0; i < catagories.length; ++i) {
        amount = await getAmount(latitude, longitude, catagoryValue[catagories[i]])
        if (amount > 0) {
            places[catagoryValue[catagories[i]]] = amount
        }
        amount = 0
    }
    return {
        status: 200,
        places: places
    }

}

module.exports = getNearbyPlaces