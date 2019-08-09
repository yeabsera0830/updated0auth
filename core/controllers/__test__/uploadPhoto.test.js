const { uploadPhoto } = require('../uploadPhoto')
const Place = require('../../../model/Place')
const fs = require('fs')
jest.mock('../../../model/Place')
jest.mock('fs')

Place.findOne.mockImplementation(obj => obj['placeID'] === 'does not exist'? null : true)
Place.updateOne.mockResolvedValue(true)
fs.rename.mockResolvedValue(true)

it('"Success" test for upload photo', async () => {
    expect.assertions(1)
    const response = await uploadPhoto(1, { originalname: 'photo.png' })
    expect(response.status).toBe(200) 
})

it('"Error" test for upload photo', async () => {
    expect.assertions(1)
    const response = await uploadPhoto('does not exist', { originalname: 'photo.png' })
    expect(response.status).toBe(400) 
})

it('"Error" test for upload photo', async () => {
    expect.assertions(1)
    const response = await uploadPhoto(1, { originalname: 'photo.pdf' })
    expect(response.status).toBe(400) 
})