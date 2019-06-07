const getBusinessProfile = require('../Places/getBusinessProfile')
const connect = require('../config/auth').connect
jest.setTimeout(40000)

it('"Passing" test for /search/place', async () => {
    await connect()
    const response = await getBusinessProfile(12)
    expect(response.status).toBe(200)
})

it('"Failing" test for /search/place', async () => {
    const response = await getBusinessProfile(1230)
    expect(response.status).toBe(400)
})

it('"Failing" test for /search/place', async () => {
    const response = await getBusinessProfile()
    expect(response.status).toBe(400)
})