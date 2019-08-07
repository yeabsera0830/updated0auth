const Places = require('../../../model/Place')
const User = require('../../../model/User')
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

function swap(i, j, venues) {
    var temp = venues[i]
    venues[i] = venues[j]
    venues[j] = temp
    return venues
}

function sortByProximity(venues) {
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
    return sortByProximity(returned)
}

async function searchPlaces (latitude, longitude, filter, userID, start, finish) {
    const CLOSE_BY = 1500
    const NOT_SO_FAR = 4000
    const fetchedPlaces = await Places.find({ })
    const found = await User.findOne({ id: userID })
    if (filter == "" || filter == null) {
        return {
            status: 200,
            places: formatter(fetchedPlaces, found.bookmarks, latitude, longitude)
        }
    }
    var fetchedByCategory = []
    if (typeof filter['1'] == 'undefined') {
        fetchedByCategory = fetchedPlaces
    } else {
        fetchedPlaces.forEach(place => {
            if (place.placeCategory === filter['1']) {
                fetchedByCategory.push(place)
            }
        })
    }
    
    var fetchedByLocation = []
    if (typeof filter['2'] == 'undefined' || filter['2'] < 0 || filter['2'] > 2) {
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
    if (typeof filter['3'] == 'undefined' || filter['3'] > 2 || filter['3'] < 1) {
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

    var fetchedByOpenDays = []
    if (typeof filter['5'] == 'undefined' || filter['5'].length === 0) {
        fetchedByOpenDays = fetchedByPrice
    } else {
        fetchedByPrice.forEach(place => {
            place.placeOpenDays.forEach(day => {
                if (filter['5'].indexOf(day) >= 0 && fetchedByOpenDays.indexOf(place) === -1) {
                    fetchedByOpenDays.push(place)
                }
            })
        })
    }


    var fetchedByName = []
    if (typeof filter['8'] == 'undefined') {
        fetchedByName = fetchedByOpenDays
    } else {
        var fetchedName = filter['8']
        var placeExp = new RegExp('^' + fetchedName, 'gi')
        fetchedByOpenDays.forEach(place => {
            match = null
            match = place.placeName.match(placeExp)
            if (match != null) {
                fetchedByName.push(place)
            }
        })
    }

    var formatted = formatter(fetchedByName, found.bookmarks, latitude, longitude)
    return {
        status: 200,
        places: formatted.slice(start, finish)
    }
}

module.exports = searchPlaces