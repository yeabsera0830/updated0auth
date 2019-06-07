const connect = require('../config/auth').connect
const searchSuggestions = require('../Places/searchSuggestions')
jest.setTimeout(40000)

it('"Passing" test for /search/suggestions', async () => {
    await connect()
    const response = await searchSuggestions('ka')
    expect(response.status).toBe(200)
})

it('"Passing" test for /search/suggestions', async () => {
    await connect()
    const response = await searchSuggestions()
    expect(response.status).toBe(400)
})