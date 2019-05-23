const Place = require('../model/Place')
const checkZeilaToken = require('./checkUser')
const connect = require('../config/auth').connect
connect()

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) * 111000
}

async function getAmount(latitude, longitude, catagory) {
    var radius = 3000
    var distance = null
    var count = 0
    return await Place.find({ placeType: catagory })
            .then(allPlaces => {
                for (let i = 0; i < allPlaces.length; ++i) {
                    distance = calculateDistance(latitude, longitude, allPlaces[i].placeLocation.latitude, allPlaces[i].placeLocation.longitude)
                    if (distance < radius) {
                        count++
                    }
                }
                return count
            })
}


function swap(i, j, venues) {
    var temp = venues[i]
    venues[i] = venues[j]
    venues[j] = temp
    return venues
}

function sortPlaces(places) {
    var min = 0
    for (let i = 0; i < places.length; ++i) {
        min = i
        for (let j = i+1; j < places.length; ++j) {
            if (places[min].proximity > places[j].proximity) {
                min = j
            }
        }
        places = swap(min, i, places)
    }
    return places
}
async function getPlaces(latitude, longitude, catagory) {
    var radius = 3000
    var distance = null
    var places = []
    var place = null
    const allPlaces = await Place.find({ placeType: catagory })
    for (let i = 0; i < allPlaces.length; ++i) {
        place = {}
        distance = calculateDistance(latitude, longitude, allPlaces[i].placeLocation.latitude, allPlaces[i].placeLocation.longitude)
        if (distance > radius) {
            continue
        }
        place.id = allPlaces[i].placeID
        place.name = allPlaces[i].placeName
        palce.image = allPlaces[i].placeProfilePicture
        place.overview = allPlaces[i].placeType
        place.proximity = Math.round(distance)
        place.ratings = allPlaces[i].placeRating
        places.push(place)
    }
    
    return sortPlaces(places)
}


async function getPlacesByCatagory(accessToken, latitude, longitude, catagory) {
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
            message: "Unable to get places"
        }
    }

    catagory = catagory.toLowerCase()
    const index = catagory.length
    if (catagory[index-1] == 's') {
        catagory = catagory.slice(0, index-1)
    }

    const catagories = [
        'restaurant', 'event', 'garage', 'hospital', 'bar', 'park', 'gym', 'pharmacie'
    ]

    const checkCatagory = catagories.find(item => item.toLocaleLowerCase() === catagory)

    if (catagory === 'pharmacie') {
        catagory = 'pharmacy'
    }

    console.log(catagory)
    if (checkCatagory == undefined || checkCatagory == null) {
        return {
            status: 400,
            message: "Could Not Find The Catagory."
        }
    }

    
    const places = await getPlaces(latitude, longitude, catagory)
    if (places.length < 1) {
        return {
            status: 400,
            message: "Could Not Find Any Places Around You"
        }
    }
    return {
        status: 200,
        places: places
    }

}

module.exports = { getPlacesByCatagory, getPlaces }