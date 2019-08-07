const PlaceSave = require('../model/Place')
const connect = require('../config/auth').connect
const Places = require('./Businesses').businesses

async function addPlaces(Places) {
    var newPlace = null
    var success = null
    for (let i = 0; i < Places.length; ++i) {
        newPlace = new PlaceSave()
        newPlace.placeID = Places[i].placeID
        newPlace.placeName = Places[i].placeName
        newPlace.placePrice = Places[i].placePrice
        newPlace.placeCategory = Places[i].placeCategory
        newPlace.placeOpenDays = Places[i].placeOpenDays
        newPlace.placeOpenHours = Places[i].placeOpenHours
        newPlace.placeViews = Places[i].placeViews
        newPlace.placeType = Places[i].placeType
        newPlace.placeOverview = Places[i].placeOverview
        newPlace.placeLocation = Places[i].placeLocation   
        newPlace.placeRating = Places[i].placeRating
        newPlace.placeRatings = Places[i].placeRatings
        newPlace.placeNumberOfRatings = Places[i].placeNumberOfRatings
        newPlace.placeProfilePicture = Places[i].placeProfilePicture
        newPlace.placeReviews = Places[i].placeReviews
        newPlace.placePhotos = Places[i].placePhotos
        newPlace.placeOwner = Places[i].placeOwner
        newPlace.placeAddedOn = Places[i].placeAddedOn
        newPlace.placeAddedBy = Places[i].placeAddedBy
        success = await newPlace.save().then(res => console.log("Place " + Places[i].placeID + " added")).catch(err => console.log(err))
    }
}

async function pushPlaces() {
    await addPlaces(Places)
}

async function callback() {
    connect()
    await test()
}

module.exports = pushPlaces