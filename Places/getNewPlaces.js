const Place = require('../model/Place')
const connect = require('../config/auth').connect

function calculateDistance(x1, y1, x2, y2) {
    return Math.round(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) * 111000)
}

function swap(i, j, venues) {
    var temp = venues[i]
    venues[i] = venues[j]
    venues[j] = temp
    return venues
}

function sortBusinesses(venues) {
    var min = null
    for (let i = 0; i < venues.length; ++i) {
        min = i
        for (let j = i+1; j < venues.length; ++j) {
            if (venues[min].proximity > venues[j].proximity) {
                min = j
            }
        }
        venues = swap(min, i, venues)
    }
    return venues
}

async function fetchNewPlaces(latitude, longitude, start, finish) {
    await connect()
    const Businesses = await Place.find({})
    var date = null
    var diff = 0
    const currDate = new Date()
    var placeAdded = {}
    var fetched = []
    Businesses.forEach(place => {
        placeAdded = {}
        date = new Date(place.placeAddedOn)
        diff = currDate.getMonth() - date.getMonth()
        if (diff <= 3) {
            placeAdded.id = place.placeID
            placeAdded.name = place.placeName
            placeAdded.overview = place.placeOverview
            placeAdded.profilePicture = place.placeProfilePicture
            placeAdded.proximity = calculateDistance(latitude, longitude, place.placeLocation.latitude, place.placeLocation.longitude)
            placeAdded.rating = place.placeRating
            placeAdded.location = place.placeLocation
            placeAdded.numberOfRatings = place.placeNumberOfRatings
            fetched.push(placeAdded)
        }
    })
    var sorted = sortBusinesses(fetched.reverse())
    var businessesReturned = sorted.slice(start, finish)
    return businessesReturned
}


async function getNewPlaces(latitude, longitude, start, finish) {
    await connect()
    if (typeof latitude == 'string' || typeof longitude == 'string' || latitude == null || longitude == null ) {
        return {
            status: 400,
            message: "Unable to get places"
        }
    }

    if (typeof start != "number" || typeof finish != "number") {
        return {
            status: 400,
            message: "Unable to get places"
        }
    }

    if (start == null || finish == null || start < 0 || finish < 1) {
        return {
            status: 400,
            message: "Unable to get places"
        }
    }

    if (start >= finish) {
        return {
            status: 400,
            message: "Unable to get places"
        }
    }

    var venues = await fetchNewPlaces(latitude, longitude, start, finish)
    return {
        status: 200,
        places: venues
    }
}

module.exports = getNewPlaces