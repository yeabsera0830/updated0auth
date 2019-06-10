const getBusinessProfile = require('../Places/getBusinessProfile')
jest.setTimeout(10000)

it('"Passing" test for /search/place', async () => {
    const response = await getBusinessProfile(12)
    expect(response.status).toBe(200)
})

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