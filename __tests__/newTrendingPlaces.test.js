const getTrendingPlaces = require('../Places/TrendingPlaces')
const connect = require('../config/auth').connect
jest.setTimeout(40000)

it('should ', async () => {
    await connect()
    const response = await getTrendingPlaces(0, 3)
    console.log(response)
});