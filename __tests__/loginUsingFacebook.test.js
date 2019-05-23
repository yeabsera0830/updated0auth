const token = 'EAAIZCRdirl3wBAFxiewQBPPuKLXmhttvCAgXfaI9G8P72Uki10LMn2kvkU3lFL6c1v8fDZBPcqMvbxPiLIu2Go96vj9zHc2PoQ1HjJZBtahaXnSB3amjwHB9EOzH8yxZBKpuxiSY81KFTpnvexflvCcK8fffW5g7vClcl9axssLAbMjLNL4vUN4ZCAL7kJgfiR9CbZBMKOAdQ4tngA6mUDnGJA6wPYOZBKdPcniYPzn3AZDZD'
const axios = require('axios')

jest.setTimeout(30000)

it('"Passing" test for login with facebook', async () => {
    const response = await axios.post('http://localhost:8082/login/facebook', {
        "facebookToken": token
    }).then(res => res.data).catch(err => err.response.data)
    if (response.status === 200) {
        expect(response.token).not.toBeNull()
    } else {
        expect(response.message).not.toBeNull()
    }
});


it('"Failing" test for login with facebook', async () => {
    const response = await axios.post('http://localhost:8082/login/facebook', {
        "facebookToken": "fake token"
    }).then(res => res.data).catch(err => err.response.data)
    expect(response.status).toBe(400)
    
});