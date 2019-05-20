const token = 'EAAIZCRdirl3wBAFxiewQBPPuKLXmhttvCAgXfaI9G8P72Uki10LMn2kvkU3lFL6c1v8fDZBPcqMvbxPiLIu2Go96vj9zHc2PoQ1HjJZBtahaXnSB3amjwHB9EOzH8yxZBKpuxiSY81KFTpnvexflvCcK8fffW5g7vClcl9axssLAbMjLNL4vUN4ZCAL7kJgfiR9CbZBMKOAdQ4tngA6mUDnGJA6wPYOZBKdPcniYPzn3AZDZD'
const axios = require('axios')

async function test() {
    const response = await axios.post('http://localhost:8082/login/facebook', {
        "facebookToken": token
    }).then(res => {
        console.log(res.data)
    }).catch(err => {
        console.log(err)
    })
}

test()