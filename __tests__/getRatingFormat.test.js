const Places = require('../model/Place')
const connect = require('../config/auth').connect
jest.setTimeout(40000)

async function getRatingFormat(placeID) {
    await connect()
    const place = await Places.find({ placeID: placeID })
    const placeRatings = place[0].placeRatings
    var ratings = {}
    placeRatings.forEach(place => {
        ratings[place.userID] = place.numberOfRatings
    })
    return ratings
}

it('should ', async () => {
    const response = await getRatingFormat(12)
    console.log(response)
});
