const getNewPlaces = require('../Places/_getNewPlaces')

it('should ', async () => {
    const response = getNewPlaces(1, 1, 1, 1)
    expect(response).toBe(1)
});