const path = require('path')
const fs = require('fs')
const User = require('../../model/User')
const setName = require('./setName')
const { setLocalDB, herokuUrl, localUrl } = require('../../config/env')

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

const rand = (count) => {
    var generated = ""
    for (let i = 0; i < count; i++)
        generated += Math.random().toString(36).substr(2)
    return generated
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
            await updateDatabase(id, nameObj, link + fileName)
        }
    })
    return {
        status: 200
    }
}

module.exports = saveBasicInfo