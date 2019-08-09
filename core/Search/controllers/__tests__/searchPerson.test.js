const searchPerson = require('../searchPerson')
const User = require('../../../../model/User')
jest.mock('../../../../model/User')

User.findOne.mockImplementation(obj => obj['id'] === 'does not exist'? null: {
    firstName: 'John',
    lastName: 'Wick'
})


it('"Success" test for search person', async () => {
    expect.assertions(1)
    const response = await searchPerson(3)
    expect(response.person.name).toEqual('John Wick')
})
