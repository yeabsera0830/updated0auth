const UserSave = require('../model/User')
const connect = require('../config/auth').connect
const Users = require('./Users')

async function addUsers(Users) {
    var newUser = null
    var success = null
    for (let i = 0; i < Users.length; ++i) {
        newUser = new UserSave()
        newUser.id = Users[i].id,
        newUser.firstName = Users[i].firstName,
        newUser.middleName = Users[i].middleName,
        newUser.lastName = Users[i].lastName,
        newUser.profilePicture = Users[i].profilePicture,
        newUser.bookmarks = Users[i].bookmarks,
        newUser.friends = Users[i].friends,
        newUser.reviews = Users[i].reviews,
        newUser.catagoryOrder = Users[i].catagoryOrder,
        newUser.facebookID = Users[i].facebookID,
        newUser.zeilaToken = Users[i].zeilaToken,
        newUser.email = Users[i].email,
        newUser.phoneNumber = Users[i].phoneNumber,
        newUser.password = Users[i].password
        success = await newUser.save().then(res => console.log("User " + Users[i].id + " added")).catch(err => console.log(err))
        
    }
}

async function pushUsers() {
    await addUsers(Users)
}

async function callback() {
    connect()
    await test()
}

module.exports = pushUsers