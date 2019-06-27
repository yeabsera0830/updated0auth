const getReview = require('../getReview')
const connect = require('../../config/auth').connect

jest.setTimeout(50000)

it('"Passing" test for /review', async () => {
    await connect()
    await connect()
    await connect()
    const response = await getReview(1, 5)
    expect(response.review.likedByMe).toBe(true)
});