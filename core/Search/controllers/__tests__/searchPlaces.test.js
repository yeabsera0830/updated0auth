const searchPlaces = require('../searchPlaces')
const User = require('../../../../model/User')
const Place = require('../../../../model/Place')

jest.mock('../../../../model/User')
jest.mock('../../../../model/Place')

Place.find.mockResolvedValue([])
User.findOne.mockResolvedValue({ bookmars: [1, 2, 3] })

it('"Success" test for search places', async () => {
    expect.assertions(1)
    const response = await searchPlaces('8.01213', '38.21341', {}, 1, 0, 1)
    expect(response.status).toBe(200)
})