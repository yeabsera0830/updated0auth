const rate = require('../Places/rate')
const Place = require('../model/Place')
const connect = require('../config/auth').connect
jest.setTimeout(40000)

it('"Passing" test for /rate', async () => {
    await connect()
    await connect()
    await connect()
    const response = await rate(15, 14, 0)
    console.log(response)
    const compare = await Place.findOne({ placeID: 1 })
    expect(response.newRating.numberOfRatings).toBe(0)
})

it('"Passing" test for /rate', async () => {
    const response = await rate(1, 14, 4)
    const compare = await Place.findOne({ placeID: 1 })
    expect(response.value).toBe(compare.placeRating)
})