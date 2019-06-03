var bcrypt = require('bcryptjs')
var password = "ethiopia"
var salt = bcrypt.genSaltSync(10)
var hash = bcrypt.hashSync(password, salt)
const Businesses = require('./fetchedBusinesses')
const getReviews = require('./Reviews').getArrayOfReviewsForUser

function rand(max, min) {
    return 0 + Math.floor(Math.random() * (max - min + 1) ) + min
}

var tempNames = [
    "James",
    "Mary",
    "John",
    "Patricia",
    "Robert",
    "Jennifer",
    "Michael",
    "Linda",
    "William",
    "Elizabeth",
    "David",
    "Barbara",
    "Richard"
]

var names = [
    "beza",
    "daniel",
    "yannet",
    "Dawit",
    "naomi",
    "Dani",
    "Kidist",
    "solomon",
    "Hermela",
    "zerihun",
    "Martha",
    "Dave",
    "Betty"
]

var profilePictures = [
    'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1524593689594-aae2f26b75ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1485795959911-ea5ebf41b6ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1528763380143-65b3ac89a3ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1549436906-fef9e7682ede?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1544723495-432537d12f6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1544724107-6d5c4caaff30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1546171995-fc8620224997?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
]

var phoneNumbers = [
    '0911000001',
    '0911000002',
    '0911000003',
    '0911000004',
    '0911000005',
    '0911000006',
    '0911000007',
    '0911000008',
    '0911000009',
    '0911000010',
    '0911000011',
    '0911000012',
    '0911000013'
]

var tempUsers = []

var User = {
    id: null,
    firstName: null,
    middleName: null,
    lastName: null,
    profilePicture: null,
    bookmarks: [],
    friends: [],
    reviews: [],
    catagoryOrder: [],
    facebookID: null,
    zeilaToken: null,
    email: null,
    phoneNumber: null,
    password: null
}

var number = null
var j = null

for (let i = 0; i < names.length; ++i) {
    UserModel = {
        bookmarks: [],
        friends: [],
        reviews: [],
        catagoryOrder: []
    }
    UserModel.id = tempUsers.length + 1
    UserModel.firstName = names[i]
    UserModel.middleName = ""
    UserModel.lastName = ""
    UserModel.profilePicture = profilePictures[i]
    j = 0;
    k = rand(13, 1)
    while (true) {
        number = rand(Businesses.length, 1)
        if (j === k) {
            break
        }
        else if (UserModel.bookmarks.indexOf(number) < 0) {
            UserModel.bookmarks.push(number)
            ++j
        } else continue
    }

    j = 0;
    k = rand(13, 1)
    while (true) {
        number = rand(13, 1)
        if (j === k) {
            break
        }
        else if (UserModel.friends.indexOf(number) < 0) {
            UserModel.friends.push(number)
            ++j
        } else continue
        
    }
    UserModel.reviews = getReviews(UserModel.id)
    UserModel.catagoryOrder = [1, 3, 5, 7, 9, 11, 13, 2, 4, 6, 8, 10, 12]
    UserModel.zeilaToken = "zeilaToken"
    UserModel.facebookID = 1234
    UserModel.email = names[i].toLowerCase() + "@gmail.com"
    UserModel.phoneNumber = phoneNumbers[i]
    UserModel.password = hash
    tempUsers.push(UserModel)
}

console.log(tempUsers)

module.exports = tempUsers

