const path = require('path')
const fs = require('fs')
const User = require('../model/User')
const setName = require('./setName')

async function updateDatabase(id, name, photo) {
    if (name.middleName != undefined && name.lastName != undefined) {
        await User.updateOne({ id: id }, {
            profilePicture: photo,
            firstName: name.firstName,
            middleName: name.middleName,
            lastName: name.lastName
        })
    } else if (name.lastName != undefined) {
        await User.updateOne({ id: id }, {
            profilePicture: photo,
            firstName: name.firstName,
            lastName: name.lastName
        })
    } else {
        await User.updateOne({ id: id }, {
            profilePicture: photo,
            firstName: name.firstName
        })
    }
}

async function saveBasicInfo(id, name, file) {
    const ext = path.extname(file.originalname).toLowerCase()
    const acceptedTypes = ['.png', '.gif', '.jpeg', '.jpg']
    const nameObj = setName(name)
    if (acceptedTypes.indexOf(ext) === -1) {
        return {
            status: 400,
            message: "File type not accepted"
        }
    }

    const tempPath = file.path
    const fileName = Date.now() + ext
    const targetPath = path.join(__dirname, "/images/" + fileName)
    const url = "https://safe-escarpment-33199.herokuapp.com/Users/images/"
    const dev = "http://localhost:8090/Users/images/"
    fs.rename(tempPath, targetPath, async err => {
        if (err) return err
        else {
            await updateDatabase(id, nameObj, url + fileName)
        }
    })
    return {
        status: 200
    }
}

module.exports = saveBasicInfo