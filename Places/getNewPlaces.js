const Place = require('../model/Place')
const checkZeilaToken = require('./checkUser')
const connect = require('../config/auth').connect
connect()

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) * 111000
}

async function getPlace(placeID) {
    const place = await Place.findOne({ placeID: placeID })
    return place
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

async function getNewPlaces(accessToken, latitude, longitude) {
    const check = await checkZeilaToken(accessToken)
    if (check) {
        return {
            status: 400,
            message: "Unable to get places"
        }
    }

    const newRange = await Place.countDocuments() - 20
    var places = []
    var place = {}
    await Place.find({ placeID: { $gt: newRange } })
            .then(placesFound => {
                for (let i = 0; i < placesFound.length; ++i) {
                    place.name = placesFound[i].placeName
                    place.overview = placesFound[i].placeType
                    place.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYoGFY_My051Il-pmmtKimZOGfSOW6vuUC7N9f7ECijfNZaqCLQw"
                    place.proximity = Math.round(calculateDistance(latitude, longitude, placesFound[i].placeLocation.latitude, placesFound[i].placeLocation.longitude))
                    place.rating = -1
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
/*
async function test() {
    const accessToken = 'zxyyfl56eecti76tpz38oqlkc62ea6rpqi28f8h0pwtbsh0vc2ymq1j8tfb6t32tt857wk3xe10hjw52w02ccfr5qegsf5hue'
    const latitude = 8.990454
    const longitude = 38.813162
    const response = await getNewPlaces(accessToken, latitude, longitude)
    console.log(response)
}

test()
*/
module.exports = getNewPlaces