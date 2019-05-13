const getLocation = require('./getLocation')

it('Checks if the Location API works', async () => {
    const response = await getLocation({
        latitude: '8.9935923',
        longitude: '38.7841601'
    })
    expect(response.city).toEqual = 'Addis Ababa'
});