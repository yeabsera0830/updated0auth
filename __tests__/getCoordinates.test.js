const getCoordinates = require('../Places/getCoordinates')
jest.setTimeout(40000)

it('"Test for coordinates for length 1', () => {
    const response = getCoordinates("Bole")
    expect(response.coordinates.latitude).not.toBeNull()
})

it('"Test for coordinates for length 1', () => {
    const response = getCoordinates("Bole, Addis Ababa")
    expect(response.coordinates.latitude).not.toBeNull()
})

it('"Test for coordinates for length 1', () => {
    const response = getCoordinates("Bole Addis Ababa")
    expect(response.status).toBe(400)
})

it('"Test for coordinates for length 1', () => {
    const response = getCoordinates("Addis Ababa")
    expect(response.status).toBe(400)
})

it('"Test for coordinates for length 1', () => {
    const response = getCoordinates("Addis Ababa, Bole")
    expect(response.coordinates.latitude).not.toBeNull()
})
