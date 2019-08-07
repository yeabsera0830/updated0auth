const getCoordinates = require('../getCoordinates')

it('"Success" for getCoordinates', async () => {
    expect.assertions(1)
    const response = await getCoordinates("Bole")
    expect(response.coordinates.latitude).toBe(8.987386)
})

it('"Success" for getCoordinates', async () => {
    expect.assertions(1)
    const response = await getCoordinates("Bole, addis")
    expect(response.coordinates.latitude).toBe(8.987386)
})

it('"Success" for getCoordinates', async () => {
    expect.assertions(1)
    const response = await getCoordinates("addis, bole")
    expect(response.coordinates.latitude).toBe(8.987386)
})

it('"Success" for getCoordinates', async () => {
    expect.assertions(1)
    const response = await getCoordinates("")
    expect(response.status).toBe(400)
})