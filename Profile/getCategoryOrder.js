const User = require('../model/User')

async function getCatagoryOrder(id) {
    if (id == null) {
        return {
            status: 400,
            message: "Please insert an ID"
        }
    }
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