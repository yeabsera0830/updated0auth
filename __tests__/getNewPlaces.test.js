const getNewPlaces = require('../Places/getNewPlaces')
const connect = require('../config/auth').connect

jest.setTimeout(30000)

it('"Passing" test for /places/new ', async () => {
    await connect()
    const response = await getNewPlaces(16, 8.8, 38.8, 0, 3)
    console.log(response)
    expect(response.status).toBe(200)
})

it('"Failing" test for /places/new ', async () => {
    const response = await getNewPlaces(1, 8.8, 38.8, 3)
    expect(response.status).toBe(400)
})