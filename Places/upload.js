const Place = require('../model/Place')
const multer = require('multer')
const PORT = 3000;

async function uploadImage(id) {
    var uploadedImage
    const Storage = multer.diskStorage({
        destination(req, file, callback) {
            callback(null, './images')
        },
        async filename(req, file, callback) {
            uploadedImage = `${file.fieldname}_${Date.now()}_${file.originalname}`
            var found = await Place.findOne({ placeID: id })
            found.placePhotos.push(uploadImage)
            await Place.updateOne({ placeID: id }, { placePhotos: found.placePhotos })
            callback(null, uploadedImage)
        },
    })

    return Storage
}

module.exports = uploadImage