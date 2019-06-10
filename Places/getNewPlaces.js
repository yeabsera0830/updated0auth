const Place = require('../model/Place')
const User = require('../model/User')
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

async function fetchNewPlaces(userID, latitude, longitude, start, finish) {
    const Businesses = await Place.find({})
    const user = await User.find({ id: userID })
    const bookmarks = user[0].bookmarks
    var bookmarkedFlag = false
    var date = null
    var diff = 0
    const currDate = new Date()
    var placeAdded = {}
    var fetched = []
    Businesses.forEach(place => {
        bookmarkedFlag = false
        placeAdded = {}
        date = new Date(place.placeAddedOn)
        diff = currDate.getMonth() - date.getMonth()
        if (diff <= 3) {
            placeAdded.id = place.placeID
            if (bookmarks.indexOf(place.placeID) >= 0) {
                bookmarkedFlag = true
            }
            placeAdded.bookmarked = bookmarkedFlag
            placeAdded.name = place.placeName
            placeAdded.overview = place.placeOverview
            placeAdded.profilePicture = place.placeProfilePicture
            placeAdded.proximity = calculateDistance(latitude, longitude, place.placeLocation.latitude, place.placeLocation.longitude)
            placeAdded.rating = place.placeRating
            placeAdded.location = place.placeLocation
            fetched.push(placeAdded)
        }
    })

    var sorted = sortBusinesses(fetched.reverse())
    var businessesReturned = sorted.slice(start, finish)
    return businessesReturned
}


async function getNewPlaces(userID, latitude, longitude, start, finish) {
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

    const placesCount = await Place.countDocuments()
    if (finish >= placesCount) {
        return {
            status: 400,
            message: "Request limit is up to " + placesCount + " places"
        }
    }

    var defaultMonth = 3
    var places = null
    var currDate = new Date()
    while(true) {
        places = await fetchNewPlaces(userID, latitude, longitude, start, finish, defaultMonth)
        if (places.length >= (finish - start)) {
            return {
                status: 200,
                places: places
            }
        }

        if (defaultMonth >= currDate.getMonth() && currDate.getFullYear() <= 2019) {
            return {
                status: 400,
                message: "Please try to widen your search index"
            }
        }

        defaultMonth++
    }
}

module.exports = getNewPlaces