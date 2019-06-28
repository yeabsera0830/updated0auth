const Place = require('../model/Place')
const User = require('../model/User')

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
    const MILLIS_IN_THIS_WEEK = NOW - MILLIS_IN_WEEK
    var numOfViews = 0
    recentViews.forEach(view => {
        if (view.timestamp > MILLIS_IN_THIS_WEEK) {
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

async function getTrendingPlaces(userID, startIndex, finishIndex) {
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
            status: 200,
            places: []
        }
    }

    const placesCount = await Place.countDocuments()
    if (finishIndex >= placesCount) {
        finishIndex = placesCount
    }

    var scores = []
    var Places = await Place.find({})
    const user = await User.find({ id: userID })
    const bookmarks = user[0].bookmarks
    var bookmarkedFlag = false
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
    var fetched = []
    for (let i = 0; i < sortedPlacesByScores.length; ++i) {
        bookmarkedFlag = false
        placeAdded = {}
        placeAdded.id = sortedPlacesByScores[i].placeID
        if (bookmarks.indexOf(sortedPlacesByScores[i].placeID) >= 0) {
            bookmarkedFlag = true
        }
        placeAdded.bookmarked = bookmarkedFlag
        placeAdded.name = sortedPlacesByScores[i].placeName
        placeAdded.overview = sortedPlacesByScores[i].placeOverview
        placeAdded.profilePicture = sortedPlacesByScores[i].placeProfilePicture
        placeAdded.rating = sortedPlacesByScores[i].placeRating
        placeAdded.location = sortedPlacesByScores[i].placeLocation
        fetched.push(placeAdded)
    }
    return {
        status: 200,
        places: fetched.slice(startIndex, finishIndex)
    }
    
}

module.exports = getTrendingPlaces