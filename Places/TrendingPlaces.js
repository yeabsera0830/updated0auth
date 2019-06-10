const Place = require('../model/Place')

function calculateTrendingScore(place) {
    const MILLIS_IN_WEEK = 1000*60*60*24*7
    const MILLIS_IN_MONTH = 1000*60*60*24*30
    const NOW = new Date().getTime();
    const STARTING_TIMESTAMP = NOW - MILLIS_IN_MONTH
    const recentViews = place.placeViews
    recentViews.filter(view => view.timestamp > STARTING_TIMESTAMP)
    recentViews.map(view => view.timestamp - STARTING_TIMESTAMP)
    recentViews.reverse()
    if (recentViews.length === 0) {
        return 0
    }
    const MILLIS_IN_THIS_WEEK = new Date().getTime() - MILLIS_IN_WEEK
    var numOfViews = 0
    recentViews.forEach(view => {
        if (view < MILLIS_IN_THIS_WEEK) {
            numOfViews++
        }
    })
    return numOfViews
}

function swap(i, j, venues) {
    var temp = venues[i]
    venues[i] = venues[j]
    venues[j] = temp
    return venues
}

function sortPlacesByScore(venues) {
    var min = null
    for (let i = 0; i < venues.length; ++i) {
        min = i
        for (let j = i+1; j < venues.length; ++j) {
            if (venues[min].score < venues[j].score) {
                min = j
            }
        }
        venues = swap(min, i, venues)
    }
    return venues
}

async function getTrendingPlaces(startIndex, finishIndex) {
    if (typeof startIndex != "number" || typeof finishIndex != "number") {
        return {
            status: 400,
            message: "Unable to get places"
        }
    }

    if (startIndex == null || finishIndex == null || startIndex < 0 || finishIndex < 1) {
        return {
            status: 400,
            message: "Unable to get places"
        }
    }

    if (startIndex >= finishIndex) {
        return {
            status: 400,
            message: "Unable to get places"
        }
    }

    const placesCount = await Place.countDocuments()
    if (finishIndex >= placesCount) {
        return {
            status: 400,
            message: "Request limit is up to " + placesCount + " places"
        }
    }

    var scores = []
    var Places = await Place.find({})
    Places.forEach(place => {
        score = calculateTrendingScore(place)
        scores.push({
            id: place.placeID,
            score: score
        })
    })
    var sortedScores = sortPlacesByScore(scores)
    var sortedPlacesByScores = []
    sortedScores.forEach(place => {
        found = Places.find(venue => venue.placeID === place.id)
        sortedPlacesByScores.push(found)
    })
    return {
        status: 200,
        places: sortedPlacesByScores.slice(startIndex, finishIndex)
    }
}

module.exports = getTrendingPlaces