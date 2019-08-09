const saveCategoryOrder = require('../saveCategoryOrder')
const User = require('../../../../model/User')
jest.mock('../../../../model/User')
User.updateOne.mockImplementation((obj1, obj2) => obj1['id'] === 'does not exist'? null : true)
User.findOne.mockImplementation((obj) => obj['id'] === 'does not exist'? null : true)

it('"Success" test for save category order', async () => {
    expect.assertions(1)
    const response = await saveCategoryOrder(1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
    expect(response.status).toBe(200)
})

it('"Error" test for save category order', async () => {
    expect.assertions(1)
    const response = await saveCategoryOrder()
    expect(response.message).toEqual("Please insert an ID")
})

it('"Error" test for save category order', async () => {
    expect.assertions(1)
    const response = await saveCategoryOrder(1)
    expect(response.message).toEqual("Please send me exactly 13 catagories")
});

it('"Error" test for save category order', async () => {
    expect.assertions(1)
    const response = await saveCategoryOrder(1, [1, 2, 3])
    expect(response.message).toEqual("Please send me exactly 13 catagories")
})

it('"Error" test for save cateogory order', async () => {
    expect.assertions(1)
    const response = await saveCategoryOrder("does not exist", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
    expect(response.message).toEqual("Could not find user")
})