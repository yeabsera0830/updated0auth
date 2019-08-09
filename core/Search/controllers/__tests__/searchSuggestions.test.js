const searchSuggestions = require('../searchSuggestions')
const Place = require('../../../../model/Place')
jest.mock('../../../../model/Place')

Place.find.mockResolvedValue([])

it('"Success" test for search suggestions', async () => {
    expect.assertions(1)
    const response = await searchSuggestions('a', 1)
    expect(response.status).toBe(200)
})