const checkZeilaToken = require('./checkUser')
const Places = [
    {
        id: 1,
        major: "Addis Ababa",
        minor: "Bole",
        latitude: 8.986046,
        longitude: 38.796338
    },
    
    {
        id: 2,
        major: "Addis Ababa",
        minor: "Piassa",
        latitude: 9.036729,
        longitude: 38.755658
    },

    {
        id: 3,
        major: "Addis Ababa",
        minor: "Jemo",
        latitude: 8.958600,
        longitude: 38.713438
    },

    {
        id: 4,
        major: "Addis Ababa",
        minor: "Megenagna",
        latitude: 9.020692,
        longitude: 9.020692
    },

    {
        id: 5,
        major: "Addis Ababa",
        minor: "Mexico",
        latitude: 9.010441,
        longitude: 9.010441
    },

    {
        id: 6,
        major: "Addis Ababa",
        minor: "Goro",
        latitude: 8.996110,
        longitude: 38.830947
    }
]

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
    let smallest = getDistance(latitude, Places[0].latitude, longitude, Places[0].longitude)
    let index = 0
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