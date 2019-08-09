const getBusinessProfile = require('../getBusinessProfile')

const User = require('../../../../model/User')
const Place = require('../../../../model/Place')
const Review = require('../../../../model/Review')

jest.mock('../../../../model/User')
jest.mock('../../../../model/Place')
jest.mock('../../../../model/Review')

Place.findOne.mockImplementation(obj => obj['placeID'] === 'does not exist'? null : {
    placeLocation: {
        latitude: '8.12112',
        longitude: '38.1213'
    },
    placeRatings: [
        {
            userID: 1,
            numberOfRatings: 4
        }
    ],
    placeViews: [],
    placePhotos: []
})
User.find.mockResolvedValue([{ bookmarks: [1, 2, 3] }])
Place.updateOne.mockResolvedValue(true)
Review.find.mockResolvedValue([])

it('"Success" test for get business profile', async () => {
    const response = await getBusinessProfile(1, 1, 2, 5)
    expect(response.status).toBe(200)
})

it('"Error" test for get business profile', async () => {
    const response = await getBusinessProfile()
    expect(response.status).toBe(400)
})

it('"Error" test for get business profile', async () => {
    const response = await getBusinessProfile(1, 2, 1, 'does not exist')
    expect(response.status).toBe(400)
})