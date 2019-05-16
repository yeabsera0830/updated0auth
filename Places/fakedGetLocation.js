const checkZeilaToken = require('./checkUser')
const Places = require('../__mocks__/Places')

function getDistance(x, x1, y, y1) {
    let horizontal = Math.pow((x - x1), 2)
    let vertical = Math.pow((y - y1), 2)
    return Math.sqrt(horizontal + vertical)
}

async function getNearestPlace(accessToken, latitude, longitude) {
    const check = await checkZeilaToken(accessToken)
    if (check) {
        return {
            status: 400,
            message: "Invalid Request"
        }
    }

    if (typeof latitude == "string" || typeof longitude == "string") {
        return {
            status: 400,
            message: "Use a correct format"
        }
    }

    latitude = parseFloat(latitude)
    longitude = parseFloat(longitude)
    if (latitude > 11 || latitude < 3) {
        return {
            status: 400,
            message: "Invalid Coordinates"
        }
    }

    if (longitude > 44 || longitude < 33 || longitude == NaN) {
        return {
            status: 400,
            message: "Invalid Coordinates"
        }
    }

    let smallest = getDistance(latitude, Places[0].latitude, longitude, Places[0].longitude)
    let index = 0
    let distance = 0
    for (var i = 0; i < Places.length; ++i) {
        distance = getDistance(latitude, Places[i].latitude, longitude, Places[i].longitude)
        if (smallest > distance) {
            smallest = distance
            index = i
        }
    }


    return {
        status: 200,
        major: Places[index].major,
        minor: Places[index].minor
    }
}

async function getCoordinates(accessToken, major, minor) {
    const check = await checkZeilaToken(accessToken)
    if (check) {
        return {
            status: 400,
            message: "Invalid Request"
        }
    }
    const coords = Places.find(place => (place.minor === minor) && (place.major === major))
    if (!coords) {
        return {
            status: 400,
            message: "Place not found"
        }
    }
    return {
        status: 200,
        latitude: coords.latitude,
        longitude: coords.longitude
    }
}

module.exports = { getNearestPlace, getCoordinates }