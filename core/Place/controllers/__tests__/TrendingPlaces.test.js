const trendingPlaces = require('../TrendingPlaces')
const Place = require('../../../../model/Place')
const User = require('../../../../model/User')
jest.mock('../../../../model/User')
jest.mock('../../../../model/Place')

Place.countDocuments.mockResolvedValue(89)
Place.find.mockResolvedValue([])
User.find.mockResolvedValue([{ bookmars: [1, 2, 3] }])

it('"Success" test for trending places', async () => {
    const response = await trendingPlaces(1, 0, 1)
    expect(response.status).toBe(200)
})

it('"Success" test for trending places', async () => {
    const response = await trendingPlaces(1, 2, 1)
    expect(response.status).toBe(200)
})

it('"Error" test for trending places', async () => {
    const response = await trendingPlaces()
    expect(response.status).toBe(400)
})

it('"Error" test for trending places', async () => {
    const response = await trendingPlaces(1, 0, 0)
    expect(response.status).toBe(400)
})