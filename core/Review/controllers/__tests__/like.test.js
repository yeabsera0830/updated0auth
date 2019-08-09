const like = require('../like')
const Review = require('../../../../model/Review')
jest.mock('../../../../model/Review')

Review.findOne.mockImplementation(obj => obj['reviewID'] === 'does not exist'? null : { likedBy: [1, 2, 3] })
Review.updateOne.mockResolvedValue(true)

it('"Success" for like review', async () => {
    expect.assertions(1)
    const response = await like(1, 2)
    expect(response.newLikes).toBe(3)
})

it('"Error" for like review', async () => {
    expect.assertions(1)
    const response = await like()
    expect(response.status).toBe(400)
})

it('"Error" for like review', async () => {
    expect.assertions(1)
    const response = await like('does not exist', 1)
    expect(response.status).toBe(400)
})