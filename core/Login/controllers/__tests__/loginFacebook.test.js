const loginFacebook = require('../loginFacebook')
const axios = require('axios')
const User = require('../../../../model/User')

jest.mock('axios')
jest.mock('../../../../model/User')
User.findOne.mockImplementation(obj => (obj['facebookID'] === 'exists')? true : false)
var newUser = new User()
newUser.save.mockResolvedValue(true)

axios.get.mockResolvedValue(true)

it('"Success" for loginFacebook', async () => {
    expect.assertions(1)
    const response = await loginFacebook('some_token')
    expect(response.message).toBe('Could Not Sign In User')
})