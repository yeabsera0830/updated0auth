const Place = require('../model/Place')
const connect = require('../config/auth').connect

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
            if (venues[min].viewLength < venues[j].viewLength) {
                min = j
            }
        }
        venues = swap(min, i, venues)
    }
    return venues
}

async function fetchTrendingPlaces(start, finish) {
    const Businesses = await Place.find({})
    var fetched = []
    Businesses.forEach(place => {
        var placeAdded = {}
        placeAdded.id = place.placeID
        placeAdded.name = place.placeName
        placeAdded.overview = place.placeOverview
        placeAdded.profilePicture = place.placeProfilePicture
        placeAdded.rating = place.placeRating
        placeAdded.location = place.placeLocation
        placeAdded.numberOfRatings = place.placeNumberOfRatings
        placeAdded.viewLength = place.placeViews.length
        fetched.push(placeAdded)
    })
    var sorted = sortBusinesses(fetched.reverse())
    sorted.forEach(place => {
        delete place.viewLength
    })
    var businessesReturned = sorted.slice(start, finish)
    return businessesReturned
}


async function getTrendingPlaces (start, finish) {
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

    await connect()
    await connect()
    
    const placesCount = await Place.countDocuments()
    if (finish >= placesCount) {
        return {
            status: 400,
            message: "Request limit is up to " + placesCount + " places"
        }
    }

    const placesReturned = await fetchTrendingPlaces(start, finish)
    return {
        status: 200,
        places: placesReturned
    }
}

module.exports = getTrendingPlaces