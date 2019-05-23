const axios = require('axios')
const key = require('../config/testAuth')

jest.setTimeout(30000)

it('"Passing" test for getCoordinatesFromAddress', async () => {
    const response = await axios.post('http://localhost:8082/getCoordinatesFromAddress', {
        "accessToken": key,
	    "partialAddress": "bole, addis ababa"
    }).then(res => res.data).catch(err => err.response.data)
    if (response.status === 200) {
        expect(response.latitude).not.toBeNull()
    }
});

it('"Failing" test for getCoordinatesFromAddress', async () => {
    const response = await axios.post('http://localhost:8082/getCoordinatesFromAddress', {
        "accessToken": key,
	    "partialAddress": " "
    }).then(res => res.data).catch(err => err.response.data)
    expect(response.status).toBe(400)
});