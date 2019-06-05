const Places = require('../model/Place')
const Users = require('../model/User')
async function removeBookmark(userID, placeID) {
    if (placeID == null) {
        return {
            status: 400,
            message: 'Place not found'
        }
    }

    const place = await Places.findOne({ placeID: placeID })
    if (place == null) {
        return {
            status: 400,
            message: 'Place not found'
        }
    }
    
    // Check if it already exists
    const user = await Users.findOne({ id: userID })
    var bookmarks = user.bookmarks
    const check = bookmarks.indexOf(placeID)
    if (check >= 0) {
        bookmarks.splice(check, 1)
        await Users.updateOne({ id: userID }, { bookmarks: bookmarks })
    }
    return {
        status: 200
    }
}

module.exports = removeBookmark