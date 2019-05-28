const getNewPlaces = require('../Places/getNewPlaces').fetchNewPlaces
const Businesses = require('../__mocks__/Businesses')

jest.setTimeout(30000)

it('should ', async () => {
    const response = await getNewPlaces(8.8, 38.8, 1, 3)
    expect(response.length).toBe(3)
});