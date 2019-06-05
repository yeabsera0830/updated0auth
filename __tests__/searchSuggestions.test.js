const connect = require('../config/auth').connect
const searchSuggestions = require('../Places/searchSuggestions')
jest.setTimeout(20000)

it('"Passing" test for /search/suggestions', async () => {
    await connect()
    await connect()
    const response = await searchSuggestions('ka')
    expect(response.status).toBe(200)
});