const Place = require('../model/Place')
const checkZeilaToken = require('./checkUser')
const connect = require('../config/auth').connect
connect()

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) * 111000
}

function swap(i, j, venues) {
    var temp = venues[i]
    venues[i] = venues[j]
    venues[j] = temp
    return venues
}

function sortPlaces(venues) {
    var min = null
    for (let i = 0; i < venues.length; ++i) {
        min = i
        for (let j = i+1; j < venues.length; ++j) {
            if (venues[min].proximity > venues[j].proximity) {
                min = j
            }
        }
        venues = swap(min, i, venues)
    }
    return venues
}

async function getNewPlaces(accessToken, latitude, longitude, start, finish) {
    const check = await checkZeilaToken(accessToken)
    if (check) {
        return {
            status: 400,
            message: "Unable to get places"
        }
    }

    if (typeof latitude == 'string' || typeof longitude == 'string' || latitude == null || longitude == null ) {
        return {
            status: 400,
            message: "Please Use the correct format for your coordinates"
        }
    }

    if (typeof start != "number" || typeof finish != "number") {
        return {
            status: 400,
            message: "Please give me starting and finishing points"
        }
    }

    if (start == null || finish == null || start < 0 || finish < 1) {
        return {
            status: 400,
            message: "Please give me starting and finishing points"
        }
    }

    if (start >= finish) {
        return {
            status: 400,
            message: "The start index can not be less than or equal to the finish index"
        }
    }

    const range = await Place.countDocuments()
    const startIndex = range - finish - 1
    const finishIndex = range - start + 1
    var places = []
    var place = {}
    await Place.find({ placeID: { $gt: startIndex, $lt: finishIndex } })
            .then(placesFound => {
                for (let i = 0; i < placesFound.length; ++i) {
                    place.id = placesFound[i].placeID
                    place.name = placesFound[i].placeName
                    place.overview = placesFound[i].placeType
                    place.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYoGFY_My051Il-pmmtKimZOGfSOW6vuUC7N9f7ECijfNZaqCLQw"
                    place.proximity = Math.round(calculateDistance(latitude, longitude, placesFound[i].placeLocation.latitude, placesFound[i].placeLocation.longitude))
                    place.rating = 0
                    place.location = placesFound[i].placeLocation
                    if (placesFound[i].placeNumberOfRating == null) {
                        place.numberOfRatings = 0
                    } else {
                        place.numberOfRatings = placesFound[i].placeNumberOfRating
                    }
                    place.bookmarked = false
                    places.push(place)
                    place = {}
                }
            })
    var venues = sortPlaces(places)
    return {
        status: 200,
        places: venues
    }
}

async function test() {
    const accessToken = 'zxyyfl56eecti76tpz38oqlkc62ea6rpqi28f8h0pwtbsh0vc2ymq1j8tfb6t32tt857wk3xe10hjw52w02ccfr5qegsf5hue'
    const latitude = 8.990454
    const longitude = 38.813162
    const response = await getNewPlaces(accessToken, latitude, longitude, 0, 20)
    console.log(response)
}

//test()

module.exports = getNewPlaces