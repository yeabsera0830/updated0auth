const rate = require('../Places/rate')
const Place = require('../model/Place')
const connect = require('../config/auth').connect
jest.setTimeout(40000)

it('"Passing" test for /rate', async () => {
    await connect()
    await connect()
    await connect()
    const response = await rate(1, 16, 3)
    const compare = await Place.findOne({ placeID: 1 })
    expect(response.value).toBe(compare.placeRating)
})

it('"Passing" test for /rate', async () => {
    const response = await rate(1, 14, 4)
    const compare = await Place.findOne({ placeID: 1 })
    expect(response.value).toBe(compare.placeRating)
})