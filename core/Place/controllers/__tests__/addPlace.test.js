const { addPlace } = require('../addPlace')

it('"Success" addPlace', async () => {
    expect.assertions(1)
    const response = await addPlace()
    expect(response).toBeTruthy()
})