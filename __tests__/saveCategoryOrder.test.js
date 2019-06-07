const saveCategoryOrder = require('../Profile/saveCategoryOrder')
const connect = require('../config/auth').connect
jest.setTimeout(40000)

it('"Passing" test for /categories/saveOrder', async () => {
    await connect()
    const response = await saveCategoryOrder(5, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
    expect(response.status).toBe(200)
});

it('"Failing" test for /categories/saveOrder', async () => {
    const response = await saveCategoryOrder([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
    expect(response.status).toBe(400)
});

it('"Failing" test for /categories/saveOrder', async () => {
    const response = await saveCategoryOrder(1)
    expect(response.status).toBe(400)
});


it('"Failing" test for /categories/saveOrder', async () => {
    const response = await saveCategoryOrder([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    expect(response.status).toBe(400)
});