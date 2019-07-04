const path = require('path')
const fs = require('fs')
const Place = require('../model/Place')
const generateThumbnail = require('./generateThumbnail')

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
    const url = "https://safe-escarpment-33199.herokuapp.com/Places/images/"
    fs.rename(tempPath, targetPath, async err => {
        if (err) return err
        else {
            const response =  await generateThumbnail(targetPath)
            console.log(response)
            //await updateDatabase(id, url + fileName, found.placePhotos)
        }
    })



    return {
        status: 200
    }
}

module.exports = uploadPhoto