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
    const temp = await Place.find({ placeType: "bar" })
    console.log(temp)
    const allPlaces = await Place.find({ placeType: catagory })
    console.log(allPlaces)
    for (let i = 0; i < allPlaces.length; ++i) {
        place = {}
        distance = calculateDistance(latitude, longitude, allPlaces[i].placeLocation.latitude, allPlaces[i].placeLocation.longitude)
        if (distance > radius) {
            continue
        }
        place.name = allPlaces[i].placeName
        place.overview = allPlaces[i].placeType
        place.proximity = distance
        place.ratings = placeRating
        place.numberOfRatings = placeNumberOfRating
        places.push(place)
    }
    
    return sortPlaces(places)
}

async function test() {
    //await Place.updateMany( { placeRating: null }, { placeRating: 0, placeNumberOfRating: 0 } )
    //await Place.updateMany( { placeType: "Events" }, { placeType: "event" } )
    await Place.updateMany( { placeRating: 0 }, { "placeProfilePicture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYoGFY_My051Il-pmmtKimZOGfSOW6vuUC7N9f7ECijfNZaqCLQw" } )
    const c = await Place.find({})
    console.log(c)
    //const res = await Place.findOneAndUpdate( { placeID: 1 }, { placeOverview: "Elegant" } )
    //const now = await Place.findOne({ placeID: 1 })
    const accessToken = "a1pglv9yqnv2eztpa1yahi4i2ckw4swgmgkfpggl1uboj1bg79sj4rtxllb1a6e6je2l7jpaplynif0sq7145xsigg9gjb98"

    //const now = await getPlaces(9.008869, 38.762485, "bars")
    //console.log(now)
}

test()



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

    catagory = catagory.toLocaleLowerCase()
    const index = catagory.length
    if (catagory[index-1] != "s") {
        catagory += "s"
    }

    const catagories = [
        'Restaurants', 'Events', 'Garages', 'Hospitals', 'Bars', 'Parks', 'Gyms', 'Pharmacies'
    ]

    const checkCatagory = catagories.find(item => item.toLocaleLowerCase() === "ss")
    console.log(checkCatagory)
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

module.exports = getPlacesByCatagory