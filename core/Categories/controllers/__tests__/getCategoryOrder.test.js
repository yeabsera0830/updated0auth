const getCategoryOrder = require("../getCategoryOrder")
const User = require("../../../../model/User")
jest.mock("../../../../model/User")

User.findOne.mockImplementation(obj => obj['id'] === 'does not exist'? null : true)

it('"Success" test for Get catgegory order of a place', async () => {
    expect.assertions(1)
    const response = await getCategoryOrder(1)
    expect(response.status).toBe(200)
})

it('"Failing" test for Get catgegory order of a place', async () => {
    expect.assertions(1)
    const response = await getCategoryOrder('does not exist')
    expect(response.status).toBe(400)
})