const axios = require('axios')
const key = require('../config/testAuth')

it('"Passing" test for getCoordinatesFromAddress', async () => {
    const response = await axios.post('http://localhost:8082/getCoordinatesFromAddress', {
        "accessToken": key,
	    "major": "Addis Ababa",
	    "minor": "Kirkos"
    }).then(res => res.data).catch(err => err.response.data)
    if (response.status === 200) {
        expect(response.latitude).not.toBeNull()
    }
});

it('"Failing" test for getCoordinatesFromAddress', async () => {
    const response = await axios.post('http://localhost:8082/getCoordinatesFromAddress', {
        "accessToken": key,
	    "minor": "Kirkos"
    }).then(res => res.data).catch(err => err.response.data)
    expect(response.status).toBe(400)
});