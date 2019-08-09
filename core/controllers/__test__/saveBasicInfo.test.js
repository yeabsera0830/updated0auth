const saveBasicInfo = require('../saveBasicInfo')
const fs = require('fs')
const User = require('../../../model/User')
jest.mock('fs')
jest.mock('../../../model/User')

User.updateOne.mockResolvedValue(true)
fs.rename.mockResolvedValue(true)

it('"Success" test for save basic info', async () => {
    const response = await saveBasicInfo(1, 'Abebe Kebede', { originalname: 'profile.png' })
    expect(response.status).toBe(200)
})

it('"Error" test for save basic info', async () => {
    const response = await saveBasicInfo(1, 'Abebe Kebede', { originalname: 'profile.xml' })
    expect(response.status).toBe(400)
})