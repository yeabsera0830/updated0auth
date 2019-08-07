const getReadableAddress = require('../getReadableAddress')

it('"Success" for getReadableAddress', async () => {
    expect.assertions(1)
    const response = await getReadableAddress(9.01, 38.02)
    expect(response.address.minor).toEqual("Kolfe Keraniyo")
})