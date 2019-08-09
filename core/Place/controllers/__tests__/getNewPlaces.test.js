const getNewPlaces = require('../getNewPlaces')
const Place = require('../../../../model/Place')
const User = require('../../../../model/User')

jest.mock('../../../../model/Place')
jest.mock('../../../../model/User')
Place.countDocuments.mockResolvedValue(89)
Place.find.mockResolvedValue([])
User.find.mockResolvedValue([{ bookmarks: [1, 2, 3] }])

it('"Success" test for get new places', async () => {
    expect.assertions(1)
    const response = await getNewPlaces(1, '8.12234', '38.12321', 0, 0)
    expect(response.status).toBe(200)
})