const Places = require('../__mocks__/Places')

function getSuggestion(fetchedString) {
    if (fetchedString == null || typeof fetchedString != "string") {
        return {
            status: 400,
            message: "Please send a string"
        }
    }

    var placesReturned = []
    var matched = null
    var regex = null
    var pattern = null
    for (let i = 0; i < Places.length; ++i) {
        pattern = "^" + fetchedString
        regex = new RegExp(pattern, "i")
        matched = Places[i].minor.search(regex)
        if (matched >= 0) {
            placesReturned.push(Places[i].minor)
        }
    }

    return {
        status: 200,
        suggestions: placesReturned
    }

}

module.exports = getSuggestion