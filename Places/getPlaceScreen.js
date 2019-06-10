const Place = require('../model/Place')
const checkZeilaToken = require('./checkUser')
const connect = require('../config/auth').connect
connect()

async function getPlaceScreen(accessToken, placeID) {
    const check = await checkZeilaToken(accessToken)
    if (check) {
        return {
            status: 400,
            message: "Unable to get the place"
        }
    }

    if (typeof placeID != "number") {
        return {
            status: 400,
            message: "Please enter a correct number"
        }
    }

    const placeFound = await Place.findOne({ placeID: placeID })
    if (placeFound === null) {
        return {
            status: 400,
            message: "Could Not find the given place"
        }
    }

    return {
        status: 200,
        place: placeFound
    }
}

async function test() {
    const accessToken = 'a1pglv9yqnv2eztpa1yahi4i2ckw4swgmgkfpggl1uboj1bg79sj4rtxllb1a6e6je2l7jpaplynif0sq7145xsigg9gjb98'
    const response = await getPlaceScreen(accessToken, 10)
    console.log(response)
}

//test()

module.exports = getPlaceScreen