const checkAccessToken = require('../permissions/checkAccessToken')
const connect = require('../config/auth').connect
jest.setTimeout(40000)

it('"Passing" test for a check for accessToken', async () => {
    await connect()
    const accessToken = 'wp1wmutxln4okfxrvmolytw12zi8wyjgxukoumhivfe1zegnmabscesqt7xadnifggxg6t8z9dekt8qb7nfkvee42is0bk'
    const response = await checkAccessToken(accessToken)
    expect(response).not.toBeNull()
})

it('"Failing" test for a check for accessToken', async () => {
    const accessToken = 'FAKE_wp1wmutxln4okfxrvmolytw12zi8wyjgxukoumhivfe1zegnmabscesqt7xadnifggxg6t8z9dekt8qb7nfkvee42is0bk'
    const response = await checkAccessToken(accessToken)
    expect(response).toBeNull()
})