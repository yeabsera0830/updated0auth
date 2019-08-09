const addBoomark = require('../addBookmark')
const User = require('../../../../model/User')
const Place = require('../../../../model/Place')

jest.mock('../../../../model/Place')
jest.mock('../../../../model/User')

User.findOne.mockImplementation(obj => obj['placeID'] === 'does not exist'? null : { bookmarks: [1, 2, 3] })
User.updateOne.mockImplementation((obj1, obj2) => obj1['id'] === 'does not exist'? null : true)
Place.findOne.mockImplementation(obj => obj['placeID'] === 'does not exist'? null : true)

it('"Success" test for add bookmark', async () => {
    expect.assertions(1)
    const response = await addBoomark(1, 2)
    expect(response.status).toBe(200)
})

it('"Success" test for add bookmark', async () => {
    expect.assertions(1)
    const response = await addBoomark(1, 5)
    expect(response.status).toBe(200)
})

it('"Error" test for add', async () => {
    expect.assertions(1)
    const response = await addBoomark(1, 'does not exist')
    expect(response.message).toEqual('Place not found')
})