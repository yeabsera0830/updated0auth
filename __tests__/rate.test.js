const rate = require('../Places/rate')
const connect = require('../config/auth').connect
jest.setTimeout(20000)

it('"Passing" test for /rate', async () => {
    await connect()
    await connect()
    await connect()
    const response = await rate(1, 2, 0)
    expect(response.status).toBe(200)
})

it('"Failing" test for /rate', async () => {
    const response = await rate(111, 4, 5)
    expect(response.status).toBe(400)
})

it('"Failing" test for /rate', async () => {
    const response = await rate(1, 4, 6)
    expect(response.status).toBe(400)
})