const getCatagoryOrder = require('../Profile/getCategoryOrder')
const connect = require('../config/auth').connect
jest.setTimeout(40000)

it('"Passing" test for /categories/order', async () => {
    await connect()
    const response = await getCatagoryOrder(3)
    expect(response.status).toBe(200)
});