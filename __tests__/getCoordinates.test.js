const getCoordinatesFromAddress = require('../Places/getCoordinates').getCoordinatesFromAddress
const exactCompare = require('../Places/getCoordinates').exactCompare
it('"Test for coordinates for length 1', () => {
    const response = getCoordinatesFromAddress("Bole")
    expect(response.coordinates.latitude).not.toBeNull()
})

it('"Test for coordinates for length 1', () => {
    const response = getCoordinatesFromAddress("B")
    expect(response.coordinates.latitude).not.toBeNull()
})

it('"Fail test" for coordinates for length 1', () => {
    const response = getCoordinatesFromAddress("Addis Ababa")
    expect(response.status).toBe(400)
})

it('"Pass test" for coordinates for length more than 1', () => {
    const response = getCoordinatesFromAddress("Bole, Addis Ababa")
    expect(response.coordinates.latitude).not.toBeNull()
})


it('"Pass test" for coordinates for length more than 1', () => {
    const response = getCoordinatesFromAddress("Bo, Addis Ababa")
    expect(response.coordinates.latitude).not.toBeNull()
})

it('"Pass test" for coordinates for length more than 1', () => {
    const response = getCoordinatesFromAddress("Addis Ababa, B")
    expect(response.coordinates.latitude).not.toBeNull()
})


it('"Pass test" for coordinates for length more than 1', () => {
    const response = getCoordinatesFromAddress("Addis Ababa, Bole")
    expect(response.coordinates.latitude).not.toBeNull()
})

it('"Pass test" for coordinates for length more than 1', () => {
    const response = getCoordinatesFromAddress("kolfe, addis")
    expect(response.coordinates.latitude).not.toBeNull()
})

it('"Fail test" for coordinates for length more than 1', () => {
    const response = getCoordinatesFromAddress("Addis Ababa")
    expect(response.status).toBe(400)
})

it('Fail test for coordinates', () => {
    const response = getCoordinatesFromAddress("")
    expect(response.status).toBe(400)
})

it('Checks for exact compare', () => {
    const response = exactCompare("  Bole  ")
    console.log(response.coordinates.latitude)
    expect(response.coordinates.latitude).not.toBeNull()
});

it('Checks for exact compare', () => {
    const response = exactCompare("  Bole, Addis Ababa  ")
    console.log(response.coordinates.latitude)
    expect(response.coordinates.latitude).not.toBeNull()
});

it('Checks for exact compare', () => {
    const response = exactCompare("  Addis Ababa, addis ketema  ")
    console.log(response.coordinates.latitude)
    expect(response.coordinates.latitude).not.toBeNull()
});


it('Checks for exact compare', () => {
    const response = exactCompare("  Addis Ababa addis ketema  ")
    expect(response.status).toBe(400)
});

it('Checks for exact compare', () => {
    const response = exactCompare("  addis ketema addis ababa  ")
    expect(response.status).toBe(400)
});
