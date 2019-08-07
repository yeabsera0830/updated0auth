const axios = require('axios')
const User = require('../../../../model/User')
var checkIfUserExsits = require('../checkIfUserExists')
const signupFacebook = require('../signupFacebook')

jest.mock('axios')
jest.mock('../../../../model/User')
jest.mock('../checkIfUserExists')
axios.get.mockResolvedValue(true)
checkIfUserExsits.mockImplementation(x => (x === 'exists')? true : false)
var newUser = new User()
newUser.save.mockResolvedValue(true)

it('"Success" test for signup with facebook', async () => {
    expect.assertions(1)
    const response = await signupFacebook('some_token')
    expect(response.message).toBe('Unable to signup with facebook')
})

it('"Error" test for signup with facebook', async () => {
    expect.assertions(1)
    const response = await signupFacebook('exists')
    expect(response.message).toBeTruthy()
});
