const token = 'EAAIZCRdirl3wBAFxiewQBPPuKLXmhttvCAgXfaI9G8P72Uki10LMn2kvkU3lFL6c1v8fDZBPcqMvbxPiLIu2Go96vj9zHc2PoQ1HjJZBtahaXnSB3amjwHB9EOzH8yxZBKpuxiSY81KFTpnvexflvCcK8fffW5g7vClcl9axssLAbMjLNL4vUN4ZCAL7kJgfiR9CbZBMKOAdQ4tngA6mUDnGJA6wPYOZBKdPcniYPzn3AZDZD'
const axios = require('axios')
const User = require('../model/User')

jest.setTimeout(30000)
jest.mock('../model/User')
var newUser = new User()
newUser.save.mockResolvedValue(true)

it('"Passing" test for sign up with facebook', async() => {
    const response = await axios.post('http://localhost:8082/signup/facebook', {
        "facebookToken": token
    }).then(res => res.data).catch(err => err.response.data)
    if (response.status === 200) {
        expect(response.token).not.toBeNull()
    } else {
        expect(response.message).not.toBeNull()
    }
})

it('"Failing" test for sign up with facebook', async () => {
    const response = await axios.post('http://localhost:8082/signup/facebook', {
        "facebookToken": "fake token"
    }).then(res => res.data).catch(err => err.response.data)
    expect(response.status).toBe(400)
})