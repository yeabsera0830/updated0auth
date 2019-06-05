//const Places = require('../__mocks__/Businesses')
const Places = require('../model/Place')
const connect = require('../config/auth').connect
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

function checkFilters(filter) {
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

async function searchPlaces (latitude, longitude, filter) {
    if (!checkFilters(filter)) {
        return {
            status: 400,
            message: "Please use the appropriate filters standards"
        }
    }
    if (filter['1'] == undefined) {
        filter['1'] = 0
    }
    if (filter['2'] == undefined) {
        filter['2'] = 0
    }
    if (filter['3'] == undefined) {
        filter['3'] = 0
    }
    if (filter['4'] == undefined) {
        filter['4'] = 0
    }
    if (filter['5'] == undefined) {
        filter['5'] = 0
    }
    if (filter['6'] == undefined) {
        filter['6'] = 0
    }
    if (filter['7'] == undefined) {
        filter['7'] = 0
    }
    if (filter['8'] == undefined) {
        filter['8'] = ""
    }
    const CLOSE_BY = 1000
    const NOT_SO_FAR = 2000
    if (filter['8'] == "") {
        return {
            status: 200,
            places: []
        }
    }
    const fetchedPlaces = await Places.find({})
    var fetchedByCategory = []
    fetchedPlaces.forEach(place => {
        if (place.placeCategory === filter['1']) {
            fetchedByCategory.push(place)
        }
    })
    var fetchedByLocation = []
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
        } else if (filter['2'] === 0) {
            fetchedByLocation.push(place)
        }
    })
    var fetchedByPrice = []
    fetchedByLocation.forEach(place => {
        if (filter['3'] === 1) {
            if (place.placePrice <= 3) {
                fetchedByPrice.push(place)
            }
        } else if (filter['3'] === 2) {
            if (place.placePrice <= 6) {
                fetchedByPrice.push(place)
            }
        } else if (filter['3'] === 0) {
            fetchedByPrice.push(place)
        }
    })
    var fetchedByName = []
    var fetchedName = filter['8']
    var placeExp = new RegExp('^' + fetchedName, 'gi')
    fetchedByPrice.forEach(place => {
        match = null
        match = place.placeName.match(placeExp)
        if (match != null) {
            fetchedByName.push(place)
        }
    })
    return {
        status: 200,
        places: fetchedByName
    }
}

module.exports = searchPlaces