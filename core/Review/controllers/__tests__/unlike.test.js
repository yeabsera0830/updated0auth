const unlike = require('../unlike')
const Review = require('../../../../model/Review')
jest.mock('../../../../model/Review')

Review.findOne.mockImplementation(obj => obj['reviewID'] === 'does not exist'? null : { likedBy: [1, 2, 3] })
Review.updateOne.mockResolvedValue(true)

it('"Success" test for unlike review', async () => {
    const response = await unlike(1, 3)
    expect(response.newLikes).toBe(2)
})

it('"Error" test for unlike review', async () => {
    const response = await unlike()
    expect(response.status).toBe(400)
})

it('"Error" test for unlike review', async () => {
    const response = await unlike('does not exist', 1)
    expect(response.status).toBe(400)
})