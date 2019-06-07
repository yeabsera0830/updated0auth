const arrayObject = require('../__mocks__/Places')

function getCoordinates(fetchedString) {
    fetchedString = fetchedString.trim()
    fetchedString = fetchedString.toLowerCase()
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

module.exports = getCoordinates