const axios = require('axios')
const key = require('../config/testAuth')

jest.setTimeout(10000)

it('"Passing" test for getNearbyPlaces', async () => {
    const response = await axios.post('http://localhost:8082/getNearByPlaces', {
        "accessToken": key,
	    "location": {
		    "latitude": 9.008869,
		    "longitude": 38.762485
	    }
    }).then(res => res.data).catch(err => err.response.data)
    expect(response.status).toBe(200)
})

it('"Failing" test for getNearbyPlaces', async () => {
    const response = await axios.post('http://localhost:8082/getNearByPlaces', {
        "accessToken": key,
	    "location": {
		    "longitude": 38.762485
	    }
    }).then(res => res.data).catch(err => err.response.data)
    expect(response.status).toBe(400)
})