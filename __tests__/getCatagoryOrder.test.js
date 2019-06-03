const getCatagoryOrder = require('../Places/getCategoryOrder')
jest.setTimeout(20000)

it('"Passing" test for /categories/order', async () => {
    const response = await getCatagoryOrder(3)
    expect(response.status).toBe(200)
});