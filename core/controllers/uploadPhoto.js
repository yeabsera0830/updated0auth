const path = require('path')
const fs = require('fs')
const Place = require('../../model/Place')
const { setLocalDB, localUrl, herokuUrl } = require('../../config/env')

async function updateDatabase(id, data, photos) {
    photos.push(data)
    await Place.updateOne({ placeID: id }, { placePhotos: photos })
}

const rand = (count) => {
    var generated = ""
    for (let i = 0; i < count; i++)
        generated += Math.random().toString(36).substr(2)
    return generated
}

exports.uploadPhoto = async (id, file) => {
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
    const fileName = rand(7) + Date.now() + ext
    const targetPath = fs.realpathSync('./store', [])
    var link = null
    if (setLocalDB) {
        link = localUrl + '/store/'
    } else {
        link = herokuUrl + '/store/'
    }

    fs.rename(tempPath, targetPath + '/' + fileName, async err => {
        if (err) return err
        else {
            await updateDatabase(id, link + fileName, found.placePhotos)
        }
    })

    return {
        status: 200,
        message: link + fileName
    }
}

exports.uploadImageOnly = async (file) =>{
    const ext = path.extname(file.originalname).toLowerCase()
    const acceptedTypes = ['.png', '.gif', '.jpeg', '.jpg']

    if (acceptedTypes.indexOf(ext) == -1) {
        return {
            status: 400,
            message: "File type not accepted"
        }
    }

    const tempPath = file.path
    const fileName = rand(7) + Date.now() + ext
    const targetPath = fs.realpathSync('./store', [])
    var link = null
    if (setLocalDB) {
        link = localUrl + '/store/'
    } else {
        link = herokuUrl + '/store/'
    }

    fs.rename(tempPath, targetPath + '/' + fileName, async err => {
        if (err) return err
    })

    return {
        status: 200,
        link: link + fileName
    }
}