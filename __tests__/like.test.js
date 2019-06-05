const like = require('../Reviews/like')
const connect = require('../config/auth').connect
jest.setTimeout(20000)

it('"Passing" test for /like', async () => {
    await connect()
    await connect()
    const response = await like(2, 16)
    console.log(response)
    expect(response.likes).not.toBe(0)
})

it('"Passing" test for /like', async () => {
    const response = await like(2, 16)
    console.log(response)
    expect(response.likes).not.toBe(0)
})

it('"Failing" test for /like', async () => {
    const response = await like(90, 1)
    expect(response.status).toBe(400)
})