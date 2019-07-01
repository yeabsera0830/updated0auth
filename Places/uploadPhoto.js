const path = require('path')
const fs = require('fs')
const Place = require('../model/Place')

async function updateDatabase(id, data, photos) {
    photos.push(data)
    await Place.updateOne({ placeID: id }, { placePhotos: photos })
}

async function uploadPhoto(id, file) {
    const found = await Place.findOne({ placeID: id })
    if (found == null) {
        return {
            status: 400,
            message: "Place not found"
        }
    }

    const ext = path.extname(file.originalname).toLowerCase()
    const acceptedTypes = ['.png', '.gif', '.jpeg', '.jpg']

    if (acceptedTypes.indexOf(ext) == -1) {
        return {
            status: 400,
            message: "File type not accepted"
        }
    }

    const tempPath = file.path
    const fileName = Date.now() + ext
    const targetPath = path.join(__dirname, "/images/" + fileName)
    fs.rename(tempPath, targetPath, async err => {
        if (err) return err
        else {
            await updateDatabase(id, "/images/" + fileName, found.placePhotos)
        }
    })
    return {
        status: 200
    }
}

module.exports = uploadPhoto