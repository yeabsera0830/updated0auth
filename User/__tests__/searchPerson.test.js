const searchPerson = require('../searchPerson')
const connect = require('../../config/auth').connect

jest.setTimeout(40000)

it('"Passing" test for /search/person', async () => {
    await connect()
    await connect()
    await connect()
    const response = await searchPerson(12)
    expect(response.person.name).toEqual("Dave  ")
})

it('"Failing" test for /search/person', async () => {
    const response = await searchPerson(45)
    expect(response.status).toBe(400)
})