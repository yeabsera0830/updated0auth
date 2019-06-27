const addReview = require('../addReview')
const Review = require('../../model/Review')
const connect = require('../../config/auth').connect

jest.setTimeout(50000)

it('"Passing" test for /review/add', async () => {
    await connect()
    await connect()
    await connect()
    const count = await Review.countDocuments() + 1
    const response = await addReview(16, 4, "The most delicate place")
    expect(response.reviewID).toBe(count)
});

it('"Failing" test for /review/add', async () => {
    const response = await addReview(16, 124, "The most delicate place")
    expect(response.status).toBe(400)
});