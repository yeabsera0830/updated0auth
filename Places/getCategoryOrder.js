const User = require('../model/User')
const connect = require('../config/auth').connect

async function getCatagoryOrder(id) {
    if (id == null) {
        return {
            status: 400,
            message: "Please insert an ID"
        }
    }
    await connect()
    await connect()

    var userID = id + ""
    const user = await User.findOne({ id: userID })
    if (user == null) {
        return {
            status: 400,
            message: "Could not find user"
        }
    } else {
        return {
            status: 200,
            categories: user.catagoryOrder
        }
    }
}

module.exports = getCatagoryOrder