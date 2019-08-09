const addReview = require('../addReview')
const Review = require('../../../../model/Review')
const Place = require('../../../../model/Place')
jest.mock('../../../../model/Review')
jest.mock('../../../../model/Place')

Place.findOne.mockImplementation(obj => obj['placeID'] === 'does not exist'? null : true)
const newReview = new Review()
newReview.save.mockResolvedValue(true)

it('"Success" test for add review', async () => {
    const response = await addReview(1, 2, 'Great!')
    expect(response.status).toBe(200)
})

it('"Error" test for add review', async () => {
    const response = await addReview(1, 'does not exist', 'Great!')
    expect(response.status).toBe(400)
})