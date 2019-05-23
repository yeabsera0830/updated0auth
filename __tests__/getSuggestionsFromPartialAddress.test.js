const axios = require('axios')
const key = require('../config/testAuth')

jest.setTimeout(10000)

it('"Passing" test for getSuggestionsFromPartialAddress', async () => {
    const response = await axios.post('http://localhost:8082/getSuggestionsFromPartialAddress', {
        "partialAddress": "bole, addis"
    }).then(res => res.data).catch(err => err.response.data)
    expect(response.status).toBe(200)
})

it('"Failing" test for getSuggestionsFromPartialAddress', async () => {
    const response = await axios.post('http://localhost:8082/getSuggestionsFromPartialAddress', {
        "partialAddress": ""
    }).then(res => res.data).catch(err => err.response.data)
    expect(response.status).toBe(400)
})