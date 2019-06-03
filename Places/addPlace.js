const Place = require('../model/Place')
const User = require('../model/User')
const connect = require('../config/auth').connect
const axios = require('axios')
const URLSearchParams = require('url').URLSearchParams
const versionController = require('./versionController')
const checkZeilaToken = require('./checkUser')
const Places = require('../__mocks__/Places')
const getDistance = require('./fakedGetLocation').getDistance

const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
const parameters = {
    client_id: 'VBJIHMIS22N50XBQL1TXJEA4D5DEBNNAD0Q2MXKSETGFDLM2',
    client_secret: 'PUL5IKQY4DABKD3JGLKU5MDUP1RWHLUDD4H3BLN3Z2LA5XRK',
    ll: null,
    v: versionController(),
    radius: null,
    query: null
}

//connect()

function rand(max, min) {
    return 0 + Math.floor(Math.random() * (max - min + 1) ) + min
}

function randomDateGenerator() {
    const year = '2019'
    const mm = rand(12, 1)
    var month = null
    if (mm < 10) {
        month = "0" + mm
    } else {
        month = "" + mm
    }
    var date = null
    const dd = rand(31, 1)
    if (dd < 10) {
        date = "0" + dd
    } else {
        date = "" + dd
    }

    var hh = rand(23, 0)
    var hour = null
    if (hh < 10) {
        hour = "0" + hh
    } else {
        hour = "" + hh
    }

    var mi = rand(59, 0)
    var minute = null
    if (mi < 10) {
        minute = "0" + mi
    } else {
        minute = "" + mi
    }

    var ss = rand(59, 0)
    var second = null
    if (ss < 10) {
        second = "0" + ss
    } else {
        second = "" + ss
    }

    const randomDate = new Date(`${year}-${month}-${date} ${hour}:${minute}:${second}`)
    return randomDate
}

var place = {
    placeID: null,
    placeName: null,
    placeType: null,
    placeLocation: {
        latitude: null,
        longitude: null
    },

}

var venue = {
    placeID: null,
    placeName: null,
    placeCatagory: null,
    placeOpenDays: [],
    placeOpenHours: [],
    placeViews: [],
    placeType: null,
    placeOverview: null,
    placeLocation: {
        latitude: null,
        longitude: null
    },
    placeRating: null,
    placeNumberOfRatings: null,
    placeProfilePicture: null,
    placeReviews: [],
    placePhotos: [],
    placeOwner: null,
    placeAddedOn: null,
    placeAddedBy: null
}

function getNearestLocation(latitude, longitude) {
    let smallest = getDistance(latitude, Places[0].latitude, longitude, Places[0].longitude)
    let index = 0
    let distance = 0
    for (var i = 0; i < Places.length; ++i) {
        distance = getDistance(latitude, Places[i].latitude, longitude, Places[i].longitude)
        if (smallest > distance) {
            smallest = distance
            index = i
        }
    }

    return Places[index]
}

const profilePictures = [
    'https://i.paste.pics/5P9NQ.png',
    'https://i.paste.pics/5P9OW.png',
    'https://i.paste.pics/5P9P5.png',
    'https://i.paste.pics/5P9PJ.png'
]

const defaultOpenDays = {
    Monday: 1,
    Tuesday: 1,
    Wednesday: 1,
    Thursday: 1,
    Friday: 1,
    Saturday: 3,
    Sunday: 3
}

const defaultOpenHoursForWeekDays = {
    openedAt: 3,
    closedAt: 12,
    closedForLunchAt: 6,
    openedAfterLunchAt: 8
}

const defaultOpenHoursForWeekEnds = {
    openedAt: -2,
    closedForLunchAt: -2,
    openedAfterLunchAt: -2,
    closedAt: -2
}

var startDate = new Date("2019-01-01 00:00:00")

const datePicker = () => {
    var dd = startDate.getDate()
    var mm = startDate.getMonth()
    if (dd > 28) {
        dd = 0
        mm += 1
    } else {
        dd += 2
    }
    startDate.setDate(dd)
    startDate.setMonth(mm)
    startDate.setHours(rand(23, 0))
    startDate.setMinutes(rand(59, 0))
    startDate.setSeconds(rand(59, 0))
    return startDate
}

const tester = () => console.log(startDate)


async function placeAdded(latitude, longitude, placeType, area, catagoryNumber) {
    parameters.ll = "" + latitude + ", " + longitude
    parameters.query = placeType
    parameters.radius = Math.round(Math.sqrt(area / Math.PI) * 1000)
    console.log("Radius: " + parameters.radius)
    return await axios.get(endPoint + new URLSearchParams(parameters)).then(async info => {
        const groups = info.data.response.groups
        var placesFound = groups[0].items
        var checkIfExists = null
        var newPlace = null
        console.log(parameters)
        for (let i = 0; i < placesFound.length; ++i) {
            checkIfExists = null
            newPlace = new Place()
            id = await Place.countDocuments() + 1
            newPlace.placeID = parseInt(id)
            newPlace.placeName = placesFound[i].venue.name
            newPlace.placeCatagory = catagoryNumber
            newPlace.placeOpenDays = defaultOpenDays
            newPlace.placeOpenHours = [
                defaultOpenHoursForWeekDays,
                defaultOpenHoursForWeekDays,
                defaultOpenHoursForWeekDays,
                defaultOpenHoursForWeekDays,
                defaultOpenHoursForWeekDays,
                defaultOpenHoursForWeekEnds,
                defaultOpenHoursForWeekEnds
            ]
            newPlace.placeType = placeType
            newPlace.placeOverview = placeType
            newPlace.placeLocation.latitude = placesFound[i].venue.location.lat,
            newPlace.placeLocation.longitude = placesFound[i].venue.location.lng
            newPlace.placeRating = 0
            newPlace.placeNumberOfRatings = 0
            newPlace.placeProfilePicture = profilePictures[rand(3, 0)],
            newPlace.placeReviews = [],
            newPlace.placePhotos = [
                profilePictures[rand(3, 1)],
                profilePictures[rand(3, 1)]
            ],
            newPlace.placeViews = "",
            newPlace.placeOwner = rand(newPlace.placeID, 1)
            newPlace.placeAddedOn = datePicker()
            newPlace.placeAddedBy = rand(newPlace.placeID, 1)
            console.log(newPlace)
            checkIfExists = await Place.findOne({ placeID: newPlace.placeID })
            if (checkIfExists == null) {
                await newPlace.save().then(response => {
                    console.log(response.placeName + " added")
                }).catch(err => {
                    console.log(err)
                })
            } else {
                continue
            }
            
        }
    }).catch(err => {
        console.log("Something wrong in the foursquare api")
        console.log(err.response)
    })
}

async function testFourSquare() {
    parameters.ll = "8.9935923, 38.7841601"
    parameters.radius = 1000
    parameters.query = 'bar'
    parameters.v = versionController()
    await axios.get(endPoint + new URLSearchParams(parameters)).then(async info => {
        console.log(info.data.response)
        const groups = info.data.response.groups
        var placesFound = groups[0].items
        console.log(placesFound)
    }).catch(err => {
        console.log(err)
    })
 }

/*
async function addPlace(latitude, longitude, placeType, area) {
    parameters.ll = "" + latitude + ", " + longitude
    parameters.query = placeType
    parameters.radius = Math.round(Math.sqrt(area / Math.PI) * 1000)
    console.log("Radius: " + parameters.radius)
    return await axios.get(endPoint + new URLSearchParams(parameters))
            .then(async info => {
                const groups = info.data.response.groups
                var placesFound = groups[0].items
                var checkIfExists = null
                var newPlace = null
                for (let i = 0; i < placesFound.length; ++i) {
                    checkIfExists = null
                    newPlace = new Place()
                    newPlace.placeID = await Place.countDocuments() + 1
                    newPlace.fourSquareID = placesFound[i].venue.id
                    newPlace.placeName = placesFound[i].venue.name
                    newPlace.placeType = placeType
                    newPlace.placeOverview = null
                    newPlace.placeRating = null
                    newPlace.placeNumberOfRatings = null
                    newPlace.placeLocation.latitude = placesFound[i].venue.location.lat,
                    newPlace.placeLocation.longitude = placesFound[i].venue.location.lng
                    checkIfExists = await Place.findOne( { fourSquareID: newPlace.fourSquareID } )
                    if (checkIfExists == null) {
                        const confirmSave = await newPlace.save()
                        if (confirmSave != null) {
                            console.log(confirmSave.placeName + " Added")
                        } else {
                            console.log("Error Occured")
                        }
                    } else {
                        console.log(checkIfExists.placeName + " Already Exists")
                    }
                }
            })
            .catch(err => {
                console.log("Invalid Query")
            })
}
*/



module.exports = placeAdded