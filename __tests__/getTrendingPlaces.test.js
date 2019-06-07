const getTrendingPlaces = require('../Places/getTrendingPlaces')
const connect = require('../config/auth').connect
jest.setTimeout(40000)

it('"Passing" test for /places/trending', async () => {
    await connect()
    const response = await getTrendingPlaces(0, 3)
    expect(response.status).toBe(200)
})

it('"Failing" test for /places/trending', async () => {
    const response = await getTrendingPlaces(3, 3)
    expect(response.status).toBe(400)
})