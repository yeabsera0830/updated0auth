const getNewPlaces = require('../Places/getNewPlaces')

jest.setTimeout(30000)

it('"Passing" test for /places/new ', async () => {
    const response = await getNewPlaces(8.8, 38.8, 0, 3)
    expect(response.status).toBe(200)
})

it('"Failing" test for /places/new ', async () => {
    const response = await getNewPlaces(8.8, 38.8, 3)
    expect(response.status).toBe(400)
})