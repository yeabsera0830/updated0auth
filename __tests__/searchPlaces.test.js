const searchPlaces = require('../Places/searchPlaces')
const connect = require('../config/auth').connect
jest.setTimeout(40000)

it('"Passing" test for /search/places', async () => {
    await connect()
    const filter = {
        '1': 2,
        '2': 0,
        '3': 1,
        '8': 'office'
    }
    const response = await searchPlaces(8.990569, 38.801838, filter)
    expect(response.status).toBe(200)
});

it('"Failing" test for /search/places', async () => {
    const response = await searchPlaces(8.990569, 38.801838)
    expect(response.status).toBe(400)
    
});