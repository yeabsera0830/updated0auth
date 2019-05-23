const getPlaceByCatagory = require('../Places/getPlaceByCatagory').getPlacesByCatagory
jest.setTimeout(30000)

it('should ', async () => {
    const response = await getPlaceByCatagory(8.990569, 38.801838, "bar")
    expect(response.places[0].placeID).not.toBeNull()
});