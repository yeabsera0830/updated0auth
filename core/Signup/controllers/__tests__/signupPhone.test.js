const signupPhone = require('../signupPhone').signUpUsingPhoneNumber
const User = require('../../../../model/User')

jest.mock('../../../../model/User')
User.findOne.mockImplementation(obj => (obj['phoneNumber'] === 'exists')? true : false)
var newUser = new User()
newUser.save.mockResolvedValue(true)

it('"Success" for signupPhone', async () => {
    expect.assertions(1)
    const response = await signupPhone('0911121314', 'password')
    expect(response.status).toBe(200)
})

it('"Error" for signupPhone', async () => {
    expect.assertions(1)
    const response = await signupPhone('exists', 'password')
    expect(response.status).toBe(400)
})