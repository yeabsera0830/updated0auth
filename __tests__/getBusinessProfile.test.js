const getBusinessProfile = require('../Places/getBusinessProfile')
const connect = require('../config/auth').connect
const Place = require('../model/Place')

jest.setTimeout(50000)

/*
it('"Passing" test for /search/place', async () => {
    await connect()
    await connect()
    await connect()
    const response = await getBusinessProfile(16, 3, 3, 1)
    console.log(response)
    expect(response.profile.myRating).toBe(3)
})
*/
it('"Passing" test for /search/place', async () => {
    await connect()
    await connect()
    await connect()
    const response = await getBusinessProfile(1, -3, -3, 25)
    console.log(response)
    expect(response.profile.photos.length).toBe(3)
})

/*

it('"Failing" test for /search/place', async () => {
    const response = await getBusinessProfile(1230)
    expect(response.status).toBe(400)
})

it('"Failing" test for /search/place', async () => {
    const response = await getBusinessProfile('12')
    expect(response.status).toBe(400)
})


it('"Failing" test for /search/place', async () => {
    const response = await getBusinessProfile()
    expect(response.status).toBe(400)
})
*/