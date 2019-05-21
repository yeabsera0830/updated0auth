const axios = require('axios')
const key = require('../config/testAuth')

it('"Passing" test for getReadableAddress', async () => {
    const response = await axios.post('http://localhost:8082/getReadableAddress', {
        "accessToken": key,
	    "location": {
		    "latitude": 9.008869,
		    "longitude": 38.762485
	    }
    }).then(res => res.data).catch(err => err.response.data)
    if (response.status === 200) {
        expect(response.minor).not.toBeNull()
    }
});

it('"Failing" test for getReadableAddress', async () => {
    const response = await axios.post('http://localhost:8082/getReadableAddress', {
        "accessToken": key,
	    "location": {
		    "longitude": 38.762485
	    }
    }).then(res => res.data).catch(err => err.response.data)
    expect(response.status).toBe(400)
});