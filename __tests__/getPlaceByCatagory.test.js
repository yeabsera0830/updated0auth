const axios = require('axios')
const key = require('../config/testAuth')

jest.setTimeout(30000)

it('"Passing" test for getPlaceByCatagory', async () => {
    const response = await axios.post('http://localhost:8082/getPlacesByCatagory', {
        "accessToken": key,
        "location": {
		    "latitude": 9.008869,
		    "longitude": 38.762485
        },
        "catagory": "bars"
    }).then(res => res.data).catch(err => err.response.data)
    expect(response.status).toBe(200)
})

it('"Failing" test for getPlaceByCatagory', async () => {
    const response = await axios.post('http://localhost:8082/getPlacesByCatagory', {
        "accessToken": key,
        "location": {
		    "latitude": 9.008869
        },
        "catagory": "bars"
    }).then(res => res.data).catch(err => err.response.data)
    expect(response.status).toBe(400)
})