const Place = require('../model/Place')
//const checkZeilaToken = require('./checkUser')
//const connect = require('../config/auth').connect
//connect()

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) * 111000
}

function swap(i, j, venues) {
    var temp = venues[i]
    venues[i] = venues[j]
    venues[j] = temp
    return venues
}

function sortPlaces(venues) {
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

    const range = await Place.countDocuments()
    const startIndex = range - finish - 1
    const finishIndex = range - start
    var places = []
    var place = {}

}