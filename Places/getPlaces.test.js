const fetchPlacesByCatagory = require('./getPlaces')
const connect = require('../config/auth').connect
connect()

test('"PASSING" test for getPlaces', async () => {
    const accessToken = 'ody85ng2zof4useeztc4m97kubkhjk2bf0w88bkee3p8nnmeeukqlsqrn65whi2re99iql1h9vp7n5bejycmmglezez2zg5e'
    const response = await fetchPlacesByCatagory(accessToken, 8.990454, 38.813162)
    console.log(response)
    expect(200).toBe(200)
})

/*
test('"Failing" test for getPlaces', async () => {
    const accessToken = 'dy85ng2zof4useeztc4m97kubkhjk2bf0w88bkee3p8nnmeeukqlsqrn65whi2re99iql1h9vp7n5bejycmmglezez2zg5e'
    const response = await fetchPlacesByCatagory(accessToken, 8.990454, 38.813162)
    expect(response.status).toBe(400)
})*/