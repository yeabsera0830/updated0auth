const arrayObject = require('../__mocks__/Places')
const checkZeilaToken = require('./checkUser')

function getCoordinatesFromAddress(fetchedString) {
    fetchedString = fetchedString.trim()
    if (fetchedString == "") {
        return {
            status: 400,
            message: "No location found with this address"
        }
    }

    var match = null
    var coordinates = {}
    var commaPartials = fetchedString.split(",")
    if (commaPartials.length === 1) {
        pattern = new RegExp(fetchedString, "gi")
        for (let i = 0; i < arrayObject.length; ++i) {
            match = arrayObject[i].minor.match(pattern)
            if (match != null) {
                coordinates.latitude = arrayObject[i].latitude
                coordinates.longitude = arrayObject[i].longitude
                return {
                    status: 200,
                    coordinates: coordinates
                }
            }
        }
    } else if (commaPartials.length > 1) {
        for (let i = 0; i < commaPartials.length; ++i) {
            commaPartials[i] = commaPartials[i].trim()
            pattern = new RegExp(commaPartials[i], "gi")
            for (let j = 0; j < arrayObject.length; ++j) {
                match = arrayObject[j].minor.match(pattern)
                if (match != null) {
                    coordinates.latitude = arrayObject[j].latitude
                    coordinates.longitude = arrayObject[j].longitude
                    return {
                        status: 200,
                        coordinates: coordinates
                    }
                }
            }
        }
        return 0
    }

    return {
        status: 400,
        message: "No location found with this address"
    }
}

function exactCompare(fetchedString) {
    fetchedString = fetchedString.trim()
    fetchedString = fetchedString.toLowerCase()
    var match = null
    var coordinates = {}
    var commaPartials = fetchedString.split(",")
    if (commaPartials.length === 1) {
        match = arrayObject.find(place => place.minor.toLocaleLowerCase() === fetchedString)
        if (match != null) {
            coordinates.latitude = match.latitude
            coordinates.longitude = match.longitude
            return {
                status: 200,
                coordinates: coordinates
            }
        }
    }

    else if (commaPartials.length > 1) {
        for (let i = 0; i < commaPartials.length; ++i) {
            commaPartials[i] = commaPartials[i].trim()
            match = arrayObject.find(place => place.minor.toLocaleLowerCase() === commaPartials[i])
            if (match != null) {
                coordinates.latitude = match.latitude
                coordinates.longitude = match.longitude
                return {
                    status: 200,
                    coordinates: coordinates
                }
            }
        }
    }

    return {
        status: 400,
        message: "No location found with this address"
    }

}

async function getCoordinates(accessToken, fetchedString) {
    const check = await checkZeilaToken(accessToken)
    if (check) {
        return {
            status: 400,
            message: "No location found with this address"
        }
    }
    return exactCompare(fetchedString)
}

module.exports = { getCoordinates, getCoordinatesFromAddress, exactCompare}
