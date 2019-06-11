const rate = require('../Places/rate')
const connect = require('../config/auth').connect
jest.setTimeout(40000)

it('"Passing" test for /rate', async () => {
    await connect()
    const response = await rate(22, 16, 3)
    console.log(response)
    expect(response.status).toBe(200)
})