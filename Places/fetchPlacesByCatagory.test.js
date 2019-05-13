const axios = require('axios')
const URLSearchParams = require('url').URLSearchParams
const versionController = require('./versionController')

it('Checks for if the foursquare API works', async () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    const parameters = {
        client_id: 'VBJIHMIS22N50XBQL1TXJEA4D5DEBNNAD0Q2MXKSETGFDLM2',
        client_secret: 'PUL5IKQY4DABKD3JGLKU5MDUP1RWHLUDD4H3BLN3Z2LA5XRK',
        ll: '8.9935923, 38.7841601',
        v: versionController(),
        radius: 2000,
        query: 'bar'
    }

    let places = []
    let locations = []
    let temp

    await axios.get(endPoint + new URLSearchParams(parameters))
            .then(info => {
                const items = info.data.response.groups[0].items
                for (var i = 0; i < items.length; ++i) {
                    places.push(items[i])
                    temp =  items[i]
                    console.log(temp.venue.location)        
                }
                //console.log(places)

                expect(1).toBe(1)
            })

});