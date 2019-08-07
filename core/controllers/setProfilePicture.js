const path = require('path')
const fs = require('fs')
const User = require('../model/User')

async function updateDatabase(id, photo) {
    await User.updateOne({ id: id }, { profilePicture: photo })
}

async function uploadPhoto(id, file, name) {
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
    const url = "https://safe-escarpment-33199.herokuapp.com/Users/images/"
    const dev = "http://localhost:8090/Users/images/"
    fs.rename(tempPath, targetPath, async err => {
        if (err) return err
        else {
            await updateDatabase(id, url + fileName)
        }
    })
    return {
        status: 200
    }
}

module.exports = uploadPhoto