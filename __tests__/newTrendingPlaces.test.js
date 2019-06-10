const getTrendingPlaces = require('../Places/_getTrendingPlaces')

it('should ', async () => {
    const response = await getTrendingPlaces(0, 3)
    console.log(response)
});