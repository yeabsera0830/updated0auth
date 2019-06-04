const checkAccessToken = require('../permissions/checkAccessToken')
const connect = require('../config/auth').connect
jest.setTimeout(10000)

it('"Passing" test for a check for accessToken', async () => {
    await connect()
    await connect()
    await connect()
    const accessToken = '47k654u7seerkbnmn9okzaj36bon8nwopnfpnutlfpcaq5uwae0ehu2q3shmy93753usfjcolx24cai8ot9fi5guc2bblprc5'
    const response = await checkAccessToken(accessToken)
    expect(response).not.toBeNull()
})

it('"Failing" test for a check for accessToken', async () => {
    await connect()
    await connect()
    await connect()
    const accessToken = 'FAKE_47k654u7seerkbnmn9okzaj36bon8nwopnfpnutlfpcaq5uwae0ehu2q3shmy93753usfjcolx24cai8ot9fi5guc2bblprc5'
    const response = await checkAccessToken(accessToken)
    expect(response).toBeNull()
})