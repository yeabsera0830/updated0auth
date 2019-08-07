const Place = require('../../../model/Place')

exports.addPlace = async (placeProfilePicture, placeName, placePrice, placeCategory, placeTags, placeOpenDays, placeOpenHours, placeOverview, placeLocation, placePhotos, placeOwner, placeAddedBy) => {
    const placeID = await Place.countDocuments() + 1
    const newPlace = new Place({
        placeID, placeProfilePicture, placeName, placePrice, placeCategory, placeTags, placeOpenDays, placeOpenDays, placeOpenHours, placeOverview, placeLocation, placePhotos, placeOwner, placeAddedBy
    })
    return newPlace.save()
        .then(res => {
            return {
                status: 200,
                id: res.placeID
            }
        })
        .catch(err => {
            console.log(err)
            return {
                status: 400,
                message: "Mongo Error"
            }
        })
}