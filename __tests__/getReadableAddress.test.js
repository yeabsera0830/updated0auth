const getReadableAddress = require('../Places/getReadableAddress')
jest.setTimeout(40000);

it('"Passing" test for /address/readable', () => {
    const response = getReadableAddress(8.990436, 38.781865)
    expect(response.address.minor).not.toBeNull()
})

it('"Passing" test for /address/readable', () => {
    const response = getReadableAddress(0, 0)
    expect(response.address.minor).not.toBeNull()
})

it('"Failing" test for /address/readable', () => {
    const response = getReadableAddress(8.990436)
    expect(response.status).toBe(400)
})