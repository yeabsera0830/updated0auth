const getReview = require('../getReview')
const Review = require('../../../../model/Review')
jest.mock('../../../../model/Review')

Review.findOne.mockImplementation(obj => obj['reviewID'] === 'does not exist'? null : { likedBy: [1, 2, 3] })

it('"Success" test for get review', async () => {
    const response = await getReview(1, 2)
    expect(response.status).toBe(200)
})

it('"Error" test for get review', async () => {
    const response = await getReview('does not exist', 1)
    expect(response.status).toBe(400)
})