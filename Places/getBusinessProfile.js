const Place = require('../model/Place')
const connect = require('../config/auth').connect

async function getBusinessProfile(placeID) {
    await connect()
    await connect()
    if (placeID === null || typeof placeID != 'number') {
        return {
            status: 400,
            message: "Please Insert an ID"
        }
    }
    const place = await Place.findOne({ placeID: placeID })
    if (place != null) {
        return {
            status: 200,
            profile: place
        }
    } else {
        return {
            status: 400,
            message: "Could Not Find Place"
        }
    }
}

module.exports = getBusinessProfile