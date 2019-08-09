const rate = require('../rate')
const Place = require('../../../model/Place')

jest.mock('../../../model/Place')
const returned = {
    placeRatings: [
        {
            userID: 2,
            numberOfRatings: 5
        },
    
        {
            userID: 11,
            numberOfRatings: 4
        }
    ]
}
Place.findOne.mockImplementation(obj => {
    if (obj['placeID'] === 'does not exist') {
        return null
    } else if (obj['placeID'] === 22) {
        return { placeRatings: [] }
    } else {
        return returned
    }
} )
Place.updateOne.mockImplementation((obj1, obj2) => obj1['placeID'] === 'does not exist'? null : true)

it('"Success" test for rate', async () => {
    expect.assertions(1)
    const response = await rate(2, 1, 5)
    expect(response.status).toBe(200)
})

it('"Success" test for rate', async () => {
    expect.assertions(1)
    const response = await rate(4, 1, 5)
    expect(response.status).toBe(200)
})

it('"Success" test for rate', async () => {
    expect.assertions(1)
    const response = await rate(22, 1, 0)
    expect(response.status).toBe(200)
})

it('"Success" test for rate', async () => {
    expect.assertions(1)
    const response = await rate(4, 1, 0)
    expect(response.status).toBe(200)
})

it('"Error test for rate"', async () => {
    expect.assertions(1)
    const response = await rate()
    expect(response.message).toBe("Could not rate place")
})

it('"Error test for rate"', async () => {
    expect.assertions(1)
    const response = await rate(1, 2, 6)
    expect(response.message).toBe("Could not rate place")
})

it('"Error test for rate"', async () => {
    expect.assertions(1)
    const response = await rate('does not exist', 2, 5)
    expect(response.message).toBe("Could not rate place")
})