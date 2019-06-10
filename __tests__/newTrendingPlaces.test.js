const getTrendingPlaces = require('../Places/TrendingPlaces')
const connect = require('../config/auth').connect
jest.setTimeout(50000)

it('should ', async () => {
    await connect()
    const response = await getTrendingPlaces(16, 0, 3)
    console.log(response)
});