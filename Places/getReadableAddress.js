const checkZeilaToken = require('./checkUser')
const Places = require('../__mocks__/Places')

function getDistance(x, x1, y, y1) {
    let horizontal = Math.pow((x - x1), 2)
    let vertical = Math.pow((y - y1), 2)
    return Math.sqrt(horizontal + vertical)
}

function getAddress(latitude, longitude) {
    if (typeof latitude == "string" || typeof longitude == "string" || latitude == null || longitude == null) {
        return {
            status: 400,
            message: "Unable to find location"
        }
    }

    latitude = parseFloat(latitude)
    longitude = parseFloat(longitude)

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
        address: {
            major: Places[index].major,
            minor: Places[index].minor
        }
    }
}

async function getReadableAddress(accessToken, latitude, longitude) {
    const check = await checkZeilaToken(accessToken)
    if (check) {
        return {
            status: 400,
            message: "Unable to find location"
        }
    }

    if (typeof latitude == "string" || typeof longitude == "string" || latitude == null || longitude == null) {
        return {
            status: 400,
            message: "Unable to find location"
        }
    }

    latitude = parseFloat(latitude)
    longitude = parseFloat(longitude)

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
        address: {
            major: Places[index].major,
            minor: Places[index].minor
        }
    }
}

module.exports = { getReadableAddress, getAddress }