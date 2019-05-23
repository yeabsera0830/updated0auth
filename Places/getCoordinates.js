const arrayObject = require('../__mocks__/Places')
const checkZeilaToken = require('./checkUser')

function getCoordinatesFromAddress(fetchedString) {
    fetchedString = fetchedString.trim()
    if (fetchedString == "") {
        return {
            status: 400,
            message: "Please Send A Place"
        }
    }

    var match = null
    var coordinates = {}
    var commaPartials = fetchedString.split(",")
    if (commaPartials.length === 1) {
        pattern = new RegExp(fetchedString)
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
            pattern = new RegExp(commaPartials[i])
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
        message: "Could not find place with these places"
    }
}

async function getCoordinates(accessToken, fetchedString) {
    const check = await checkZeilaToken(accessToken)
    if (check) {
        return {
            status: 400,
            message: "Could not find place with these places"
        }
    }
    return getCoordinatesFromAddress(fetchedString)
}

module.exports = { getCoordinates, getCoordinatesFromAddress}
