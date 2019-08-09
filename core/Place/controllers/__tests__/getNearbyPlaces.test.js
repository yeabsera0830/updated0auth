const getNearbyPlaces = require('../getNearbyPlaces')
const Place = require('../../../../model/Place')
jest.mock('../../../../model/Place')

Place.find.mockResolvedValue([])
it('"Success" test for get near by places', async () => {
    const response = await getNearbyPlaces('8.823244', '38.02313')
    expect(response.status).toBe(200)
})