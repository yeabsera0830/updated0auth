const axios = require('axios')

it('"Passing" test for login with phone', async () => {
    const response = await axios.post('http://localhost:8082/login/phone', {
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


it('"Failing" test for login with phone', async () => {
    const response = await axios.post('http://localhost:8082/login/phone', {
        "password": "lumberjack_69"
    }).then(res => res.data)
    .catch(err => err.response.data)
    expect(response.status).toBe(400)
});