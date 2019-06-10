const User = require('../model/User')
const connect = require('../config/auth').connect

async function saveCategoryOrder(id, categoryOrder) {
    if (id == null) {
        return {
            status: 400,
            message: "Please insert an ID"
        }
    }

    if (categoryOrder == null) {
        return {
            status: 400,
            message: "Please send me exactly 13 catagories"
        }
    }

    if (categoryOrder.length != 13) {
        return {
            status: 400,
            message: "Please send me exactly 13 catagories"
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
        await User.updateOne({id: userID}, {catagoryOrder: categoryOrder})
        return {
            status: 200
        }
    }
}

module.exports = saveCategoryOrder