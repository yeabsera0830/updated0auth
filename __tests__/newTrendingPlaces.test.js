const getTrendingPlaces = require('../Places/TrendingPlaces')
const connect = require('../config/auth').connect
jest.setTimeout(50000)

it('should ', async () => {
    await connect()
    await connect()
    await connect()
    const response = await getTrendingPlaces(1, 70, 91)
    console.log(response)
});