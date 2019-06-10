const Places = require('../model/Place')

function getRatingFormat(placeRatings) {
    var ratings = {}
    if (placeRatings.length < 1) {
        return ratings
    }
    placeRatings.forEach(place => {
        ratings[place.userID] = place.numberOfRatings
    })
    return ratings
}

module.exports = getRatingFormat