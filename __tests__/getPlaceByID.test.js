const getPlaceByID = require('../Places/getPlaceByID')

jest.setTimeout(30000)

it('should ', async () => {
    const token = "a1pglv9yqnv2eztpa1yahi4i2ckw4swgmgkfpggl1uboj1bg79sj4rtxllb1a6e6je2l7jpaplynif0sq7145xsigg9gjb98"
    const response = await getPlaceByID(token, 43)
    console.log(response)
    expect(response.place.minor).toBe('Arada')
});


it('should ', async () => {
    const response = await getPlaceByID("12043")
    expect(response.status).toBe(400)
});
