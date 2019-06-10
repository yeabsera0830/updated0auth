const axios = require('axios')
const key = require('../config/testAuth')

jest.setTimeout(30000)

it('"Passing" test for getPlaceScreen', async () => {
    const response = await axios.post('http://localhost:8082/getPlaceScreen', {
        "accessToken": key,
        "placeID": 10
    }).then(res => res.data).catch(err => err.response.data)
    expect(response.status).toBe(200)
})

it('"Failing" test for getPlaceScreen', async () => {
    const response = await axios.post('http://localhost:8082/getPlaceScreen', {
        "accessToken": key,
        "placeID": "8"
    }).then(res => res.data).catch(err => err.response.data)
    expect(response.status).toBe(400)
})