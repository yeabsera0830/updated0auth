const Users = require('./Users')
const Businesses = require('./fetchedBusinesses')
const Reviews = require('./Reviews').getArrayOfReviewsForPlace
const profilePictures = require('./profilePictures')
const catagories = ['restaurant', 'event', 'garage', 'hospital', 'bar', 'park', 'gym', 'pharmacy', 'hotel', 'icecream', 'cafe', 'guest house', 'pastry']
const overviews = ['delicate', 'amazing', 'astonishing', 'pleasant', 'relaxing', 'nice', 'too much', 'expensive', 'deluxe', 'cold', 'elegant', 'comfertable', 'yummy']
const limits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
defaultOpenDays = [0, 1, 2, 3, 4, 5]
var defaultOpenHours = []

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

var temp = {}
for (let i = 0; i < 6; ++i) {
    temp = {
        day: defaultOpenDays[i],
        openingTime: "02:30",
        closingTime: "12:00"
    }
    defaultOpenHours.push(temp)
}

function rand(max, min) {
    return Math.floor(Math.random() * (max - min + 1) ) + min
}

var startDate = new Date("2019-01-01 00:00:00")

const datePicker = () => {
    var yy = startDate.getFullYear()
    var dd = startDate.getDate()
    var mm = startDate.getMonth()
    if (dd >= 27) {
        dd = 1
        mm += 1
    } else {
        dd += 2
    }
    startDate.setDate(dd)
    startDate.setMonth(mm)
    startDate.setFullYear(yy)
    startDate.setHours(rand(23, 0))
    startDate.setMinutes(rand(59, 0))
    startDate.setSeconds(rand(59, 0))
    return startDate
}

function viewDatePicker(addedDate) {
    const count = rand(13, 1)
    var viewDates = []
    var date = null
    for (let i = 0; i < count; ++i) {
        date = new Date(addedDate)
        date.setMonth(rand(1, 12))
        date.setDate(rand(1, 30))
        date.setHours(rand(0, 23))
        date.setMinutes(rand(0, 59))
        date.setSeconds(rand(0, 59))
        viewDates.push(date)
    }

    return viewDates
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
        placeOpenHours: [],
        placeViews: [],
        placeType: null,
        placeOverview: null,
        placeLocation: {
            latitude: null,
            longitude: null
        },
        placeRatings: null,
        placeNumberOfRatings: null,
        placeProfilePicture: null,
        placeReviews: [],
        placePhotos: [],
        placeOwner: null,
        placeAddedOn: null,
        placeAddedBy: null
    }
    tempBusiness.placeID = businesses.length + 1
    tempBusiness.placeName = Businesses[i].placeName
    tempBusiness.placePrice = rand(9, 1)
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
    tempBusiness.placeRatings = []
    tempBusiness.placeNumberOfRatings = tempBusiness.placeRatings.length
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
    tempBusiness.placeAddedOn = "" + datePicker()
    tempBusiness.placeViews = viewDatePicker(tempBusiness.placeAddedOn)
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

//console.log(businesses[4])

module.exports = businesses