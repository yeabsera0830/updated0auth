const loginPhone = require('../loginPhone')
const User = require('../../../../model/User')
const bcrypt = require('bcryptjs')
jest.mock('bcryptjs')
jest.mock('../../../../model/User')
User.findOne.mockImplementation(obj => (obj['phoneNumber'] === 'exists')? { password: 'pass' } : false)
bcrypt.compareSync.mockImplementation((password, stored) => (password === 'wrong_password')? false : true)

it('"Success" for loginPhone', async () => {
    expect.assertions(1)
    const response = await loginPhone('exists', 'password')
    expect(response.status).toBe(200)
})

it('"Error" for loginPhone', async () => {
    expect.assertions(1)
    const response = await loginPhone('does_not_exist', 'password')
    expect(response.status).toBe(400)
})

it('"Error" for loginPhone', async () => {
    expect.assertions(1)
    const response = await loginPhone('exists', 'wrong_password')
    expect(response.status).toBe(400)
})

it('"Error" for loginPhone', async () => {
    expect.assertions(1)
    const response = await loginPhone('does_not_exist', 'wrong_password')
    expect(response.status).toBe(400)
})