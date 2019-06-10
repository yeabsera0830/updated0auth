const getNearbyPlaces = require('../Places/getNearbyPlaces')

jest.setTimeout(30000)

it('"Passing" test for /places/nearby', async () => {
    const response = await getNearbyPlaces(8.990569, 38.801838)
    expect(response.places).not.toBeNull()
})

it('"Failing" test for /places/nearby', async () => {
    const response = await getNearbyPlaces(8.990569)
    expect(response.status).toBe(400)
})
