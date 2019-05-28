const Place = require('../model/Place')
const checkZeilaToken = require('./checkUser')
const connect = require('../config/auth').connect
connect()
//const Businesses = require('../__mocks__/Businesses')

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
    const fetchedBusinesses = await Place.find({}).then(Businesses => {
        var businessesToBeSorted = []
        var business = {}
        var reversedBusinesses =  Businesses.reverse()
        reversedBusinesses.forEach(place => {
            business.id = place.placeID
            business.name = place.placeName
            business.overview = place.placeType
            business.image = place.placeProfilePicture
            business.proximity = calculateDistance(latitude, longitude, place.placeLocation.latitude, place.placeLocation.longitude)
            business.rating = place.placeRating
            business.location = place.placeLocation
            business.numberOfRatings = place.placeNumberOfRating
            business.bookmarked = false
            businessesToBeSorted.push(business)
            business = {}
        })
        var sortedBusinesses = sortBusinesses(businessesToBeSorted)
        var businessesReturned = sortedBusinesses.slice(start, finish)
        return businessesReturned
    }).catch(err => err)
    
    return fetchedBusinesses
}

async function getNewPlaces(accessToken, latitude, longitude, start, finish) {
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

async function test() {
    const accessToken = 'zxyyfl56eecti76tpz38oqlkc62ea6rpqi28f8h0pwtbsh0vc2ymq1j8tfb6t32tt857wk3xe10hjw52w02ccfr5qegsf5hue'
    const latitude = 8.990454
    const longitude = 38.813162
    const response = await getNewPlaces(accessToken, latitude, longitude, 0, 20)
    console.log(response)
}

//test()

module.exports = { getNewPlaces, fetchNewPlaces }