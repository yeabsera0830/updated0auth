const Users = require('./Users')
const Businesses = require('./fetchedBusinesses')
const Reviews = require('./Reviews').getArrayOfReviewsForPlace
const profilePictures = require('./profilePictures')
const catagories = ['restaurant', 'event', 'garage', 'hospital', 'bar', 'park', 'gym', 'pharmacy', 'hotel', 'icecream', 'cafe', 'guest house', 'pastry']
const overviews = ['delicate', 'amazing', 'astonishing', 'pleasant', 'relaxing', 'nice', 'too much', 'expensive', 'deluxe', 'cold', 'elegant', 'comfertable', 'yummy']
const limits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
defaultOpenDays = [0, 1, 2, 3, 4, 5]

const catagoryValue = {
    restaurant: 1,
    bar: 2,
    hospital: 3,
    gym: 4,
    pharmacy: 5,
    garage: 6,
    park: 7,
    event: 8,
    hotel: 9,
    icecream: 10,
    cafe: 11,
    'guest house': 12,
    pastry: 13,
}

var defaultOpenHours = {
    openingTime: "2: 30",
    closingTime: "12: 00"
}

function rand(max, min) {
    return Math.floor(Math.random() * (max - min + 1) ) + min
}

function addedOn() {
    var count = rand(89, 0)
    var day = 86400000
    var days = 0
    for (let i = 0; i < count; ++i) {
        days += day
    }
    var today = new Date()
    var epoch = today.getTime()
    return (epoch - days)
}

function getViews(addedOnDate) {
    var count = rand(89, 0)
    var day = 86400000
    var days = 0
    for (let i = 0; i < count; ++i) {
        days += day
    }
    return (addedOnDate - days)
}


var businesses = []
var j = null

for (let i = 0; i < Businesses.length; ++i) {
    var tempBusiness = {
        placeID: null,
        placeName: null,
        placePrice: null,
        placeCategory: null,
        placeOpenDays: [],
        placeOpenHours: null,
        placeViews: [],
        placeType: null,
        placeOverview: null,
        placeLocation: {
            latitude: null,
            longitude: null
        },
        placeRating: 0,
        placeRatings: {},
        placeNumberOfRatings: 0,
        placeProfilePicture: null,
        placeReviews: [],
        placePhotos: [],
        placeOwner: null,
        placeAddedOn: null,
        placeAddedBy: null
    }
    tempBusiness.placeID = businesses.length + 1
    tempBusiness.placeName = Businesses[i].placeName
    tempBusiness.placePrice = rand(-1, 3)
    tempBusiness.placeCategory = catagoryValue[Businesses[i].placeType]
    tempBusiness.placeOpenDays = defaultOpenDays
    tempBusiness.placeOpenHours = {
        openingTime: "2: 30",
        closingTime: "12: 00"
    }
    k = rand(Users.length, 1);
    j = 0
    tempBusiness.placeType = Businesses[i].placeType
    if (limits[catagories.indexOf(tempBusiness.placeType)] > 10) {
        continue
    }
    tempBusiness.placeOverview = overviews[catagories.indexOf(tempBusiness.placeType)]
    tempBusiness.placeLocation = Businesses[i].placeLocation
    tempBusiness.placeRating = 0
    tempBusiness.placeRatings = []
    tempBusiness.placeNumberOfRatings = 0
    tempBusiness.placeProfilePicture = profilePictures[tempBusiness.placeType][rand(4, 0)]
    tempBusiness.placeReviews = Reviews(tempBusiness.placeID)
    j = 0
    while (true) {
        picture = profilePictures[tempBusiness.placeType][rand(4, 0)]
        if (j === 3) {
            break
        } else if (picture == tempBusiness.placeProfilePicture) {
            continue
        } else if (tempBusiness.placePhotos.indexOf(picture) < 0) {
            tempBusiness.placePhotos.push(picture)
            ++j
        } else continue
    }
    tempBusiness.placeOwner = rand(Users.length, 1)
    tempBusiness.placeAddedOn = addedOn()
    tempBusiness.placeViews = []
    while(true) {
        addedBy = rand(Users.length, 1)
        if (addedBy != tempBusiness.placeOwner) {
            tempBusiness.placeAddedBy = addedBy
            break
        } else continue
    }
    limits[catagories.indexOf(tempBusiness.placeType)]++
    businesses.push(tempBusiness)
}

module.exports = { businesses, getViews, addedOn }