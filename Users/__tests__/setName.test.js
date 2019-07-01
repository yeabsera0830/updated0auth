const setName = require('../setName')

it('should ', async () => {
    const name = "Slxm JJJ Jxxmi"
    const response = setName(name)
    expect(response.firstName).toBe('Slxm')
    expect(response.middleName).toBe('JJJ')
    expect(response.lastName).toBe('Jxxmi')
})