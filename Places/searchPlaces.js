//const Places = require('../__mocks__/Businesses')
const Places = require('../model/Place')
const User = require('../model/User')
function calculateDistance(x1, y1, x2, y2) {
    return Math.round(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) * 111000)
}

/**
 * Filters
 * CATEGORY: 1
 * LOCATION: 2,
 * PRICE: 3,
 * OPEN_DAYS: 5,
 * PARTIAL_NAME: 8
 * 
 * LOCATION - 
        ANY:  0,
        CLOSE_BY: 1,
        NOT_SO_FAR: 2
    PRICE -
        ANY:  0,
        CHEAP: 1,
        NOT_SO_EXPENSIVE: 2
    OPEN_DAYS -
        MONDAY: 0,
        TUESDAY: 1,
        WEDNESDAY: 2,
        THURSDAY: 3,
        FRIDAY: 4,
        SATURDAY: 5,
        SUNDAY: 6
 */

function checkErrors(latitude, longitude, filter) {
    if (latitude == null || typeof latitude != 'number') return false
    if (longitude == null || typeof longitude != 'number') return false

    if (filter['1'] != undefined) {
        if (filter['1'] > 13 || filter['1'] < 0 || typeof filter['1'] != 'number') return false
    }

    if (filter['2'] != undefined) {
        if (filter['2'] > 2 || filter['2'] < 0 || typeof filter['2'] != 'number') return false
    }

    if (filter['3'] != undefined) {
        if (filter['3'] > 2 || filter['2'] < 0 || typeof filter['3'] != 'number') return false
    }

    if (filter['5'] != undefined) {
        if (filter['5'] > 6 || filter['5'] < 0 || typeof filter['5'] != 'number') return false
    }

    if (filter['8'] != undefined) {
        if (typeof filter['8'] != 'string') return false
    }

    return true
}

function formatter(places, bookmarks, latitude, longitude) {
    var place = {
        id: null,
        bookmarked: null,
        name: null,
        overview: null,
        profilePicture: null,
        proximity: null,
        rating: null,
        location: null
    }
    var returned = []
    places.forEach(venue => {
        place = {}
        place.id = venue.placeID
        if (bookmarks.indexOf(place.id) == -1) {
            place.bookmarked = false
        } else {
            place.bookmarked = true
        }
        place.name = venue.placeName
        place.overview = venue.placeOverview
        place.profilePicture = venue.placeProfilePicture
        place.proximity = calculateDistance(latitude, longitude, venue.placeLocation.latitude, venue.placeLocation.longitude)
        place.rating = venue.placeRating
        place.location = venue.placeLocation
        returned.push(place)
    })
    return returned
}

async function searchPlaces (latitude, longitude, filter, userID) {
    const CLOSE_BY = 1000
    const NOT_SO_FAR = 2000
    const fetchedPlaces = await Places.find({})
    const found = await User.findOne({ id: userID })
    if (filter == "" || filter == null) {
        return {
            status: 200,
            places: formatter(fetchedPlaces, found.bookmarks, latitude, longitude)
        }
    }
    var fetchedByCategory = []
    if (typeof filter['1'] == 'undefined' || filter['1'] != 1) {
        fetchedByCategory = fetchedPlaces
    } else {
        fetchedPlaces.forEach(place => {
            if (place.placeCategory === filter['1']) {
                fetchedByCategory.push(place)
            }
        })
    }
    
    var fetchedByLocation = []
    if (typeof filter['2'] == 'undefined') {
        fetchedByLocation = fetchedByCategory
    } else {
        fetchedByCategory.forEach(place => {
            distance = calculateDistance(latitude, longitude, place.placeLocation.latitude, place.placeLocation.longitude)
            if (filter['2'] === 1) {
                if (distance < CLOSE_BY) {
                    fetchedByLocation.push(place)
                }
            } else if (filter['2'] === 2) {
                if (distance < NOT_SO_FAR) {
                    fetchedByLocation.push(place)
                }
            } else {
                fetchedByLocation.push(place)
            }
        })
    }

    var fetchedByPrice = []
    if (typeof filter['3'] == 'undefined') {
        fetchedByPrice = fetchedByLocation
    } else {
        fetchedByLocation.forEach(place => {
            if (filter['3'] === 1) {
                if (place.placePrice === 1) {
                    fetchedByPrice.push(place)
                }
            } else if (filter['3'] === 2) {
                if (place.placePrice === 2) {
                    fetchedByPrice.push(place)
                }
            } else {
                fetchedByPrice.push(place)
            }
        })
    }

    var fetchedByName = []
    if (typeof filter['8'] == 'undefined') {
        fetchedByName = fetchedByPrice
    } else {
        var fetchedName = filter['8']
        var placeExp = new RegExp('^' + fetchedName, 'gi')
        fetchedByPrice.forEach(place => {
            match = null
            match = place.placeName.match(placeExp)
            if (match != null) {
                fetchedByName.push(place)
            }
        })
    }

    return {
        status: 200,
        places: formatter(fetchedByName, found.bookmarks, latitude, longitude)
    }
}

module.exports = searchPlaces