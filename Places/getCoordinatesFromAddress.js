const checkZeilaToken = require('./checkUser')
const Places = require('../__mocks__/Places')

function getDistance(x, x1, y, y1) {
    let horizontal = Math.pow((x - x1), 2)
    let vertical = Math.pow((y - y1), 2)
    return Math.sqrt(horizontal + vertical)
}

async function getCoordinatesFromAddress(accessToken, major, minor) {
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
        location: {
            latitude: coords.latitude,
            longitude: coords.longitude
        }
    }
}

module.exports = getCoordinatesFromAddress