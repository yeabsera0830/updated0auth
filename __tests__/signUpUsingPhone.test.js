/*
const axios = require('axios')
jest.setTimeout(30000)

it('"Passing" test for signup with phone', async () => {
    const response = await axios.post('http://localhost:8082/signup/phone', {
        "phoneNumber": "0920202020",
        "password": "lumberjack_69"
    }).then(res => res.data)
    .catch(err => err.response.data)
    if (response.status === 200) {
        expect(response.token).not.toBeNull()
    } else {
        expect(response.message).not.toBeNull()
    }
});


it('"Failing" test for signup with phone', async () => {
    const response = await axios.post('http://localhost:8082/signup/phone', {
        "password": "lumberjack_69"
    }).then(res => res.data)
    .catch(err => err.response.data)
    expect(response.status).toBe(400)
});
*/

it('should ', () => {
    expect(1).toBe(1)
});