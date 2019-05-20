const Place = require('../model/Place')
const checkZeilaToken = require('./checkUser')

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) * 111000
}

async function getAmount(latitude, longitude, catagory) {
    //var accessToken = "ody85ng2zof4useeztc4m97kubkhjk2bf0w88bkee3p8nnmeeukqlsqrn65whi2re99iql1h9vp7n5bejycmmglezez2zg5e"
    var radius = 10000
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

async function fetchPlacesByCatagory(accessToken, latitude, longitude) {
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
        places[catagories[i]] = await getAmount(latitude, longitude, catagories[i])
    }

    return {
        status: 200,
        places: places
    }

}


module.exports = fetchPlacesByCatagory