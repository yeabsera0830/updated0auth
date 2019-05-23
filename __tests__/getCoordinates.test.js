const getCoordinatesFromAddress = require('../Places/getCoordinates').getCoordinatesFromAddress
it('"Test for coordinates for length 1', () => {
    const response = getCoordinatesFromAddress("Bole")
    expect(response.coordinates.length).toBe(1)
})

it('"Test for coordinates for length 1', () => {
    const response = getCoordinatesFromAddress("B")
    expect(response.coordinates.length).toBe(1)
})

it('"Fail test" for coordinates for length 1', () => {
    const response = getCoordinatesFromAddress("Addis Ababa")
    expect(response.status).toBe(400)
})

it('"Pass test" for coordinates for length more than 1', () => {
    const response = getCoordinatesFromAddress("Bole, Addis Ababa")
    expect(response.coordinates.length).toBe(1)
})


it('"Pass test" for coordinates for length more than 1', () => {
    const response = getCoordinatesFromAddress("Bo, Addis Ababa")
    expect(response.coordinates.length).toBe(1)
})

it('"Pass test" for coordinates for length more than 1', () => {
    const response = getCoordinatesFromAddress("Addis Ababa, B")
    expect(response.coordinates.length).toBe(1)
})


it('"Pass test" for coordinates for length more than 1', () => {
    const response = getCoordinatesFromAddress("Addis Ababa, Bole")
    expect(response.coordinates.length).toBe(1)
})

it('"Fail test" for coordinates for length more than 1', () => {
    const response = getCoordinatesFromAddress("Addis Ababa")
    expect(response.status).toBe(400)
})

it('Fail test for coordinates', () => {
    const response = getCoordinatesFromAddress("")
    expect(response.status).toBe(400)
})