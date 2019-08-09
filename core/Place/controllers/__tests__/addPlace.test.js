const { addPlace } = require('../addPlace')
const Place = require('../../../../model/Place')
jest.mock('../../../../model/Place')

const newPlace = new Place()
newPlace.save.mockResolvedValue(true)
it('"Success" test for add place', async () => {
    const response = await addPlace('image.png', 'Sheraton', 1, 2, 'Nice', [1, 2, 3, 4, 5, 6], {
        openingTime: "8:00 AM",
        closingTime: "9:00 PM"
    }, 'Perfect', {
        latitude: '8.02341',
        longitude: '38.12313'
    }, [], 1, 4)
    expect(response.status).toBe(200)
});
