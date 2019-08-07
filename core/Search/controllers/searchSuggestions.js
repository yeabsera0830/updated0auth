const Places = require('../../../model/Place')

async function searchSuggestions(partialName, numberOfSuggestions) {
    partialName = partialName.trim()
    if (partialName == "") {
        return {
            status: 200,
            suggestions: []
        }
    }

    var placesFetched = await Places.find({})
    var placesMatched = []
    var placeExp = new RegExp("^" + partialName, "gi")
    placesFetched.forEach(place => {
        match = null
        match = place.placeName.match(placeExp)
        if (match != null) {
            placesMatched.push({
                id: place.placeID,
                name: place.placeName
            })
        }
    })

    if (placesMatched.length >= numberOfSuggestions) {
        return {
            status: 200,
            suggestions: placesMatched.splice(0, numberOfSuggestions)
        }
    } else {
        console.log("@")
        return {
            status: 200,
            suggestions: placesMatched
        }
    }
}

module.exports = searchSuggestions
