const addBookmark = require('../Places/addBookmark')
const connect = require('../config/auth').connect
jest.setTimeout(20000)

it('"Passing" test for /bookmarks/add', async () => {
    await connect()
    const response = await addBookmark(3, 20)
    expect(response.status).toBe(200)
});

it('"Failing" test for /bookmarks/add', async () => {
    const response = await addBookmark(3)
    expect(response.status).toBe(400)
});
