const User = require('../model/User')

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
    var userID = id + ""

    // Check to see if every category order is unique
    for (let i =  0; i < categoryOrder.length; ++i) {
        for (let j = 0; j < categoryOrder.length; ++j) {
            if (categoryOrder[j] == categoryOrder[i] && i != j) {
                return {
                    status: 400,
                    message: "Don't send duplicate categories"
                }
            }
        }
    }

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