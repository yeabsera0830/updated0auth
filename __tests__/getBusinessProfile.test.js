const getBusinessProfile = require('../Places/getBusinessProfile').getReviews
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

it('should ', async () => {
    await connect()
    await connect()
    await connect()

    const response = await getBusinessProfile(10, 27)
    console.log(response)
    expect(response.length).not.toBe(0)
});

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