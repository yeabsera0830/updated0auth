const profilePictures = require('./profilePictures')
const thumbnailsGenerator = require('./thumbnailGenerator')
const Axios = require('axios')
const fs = require('fs')
const filePath = '../Places/images'
const output_path = '../Places/thumbnails'
const imagePath = fs.realpathSync(filePath, [])
const thumbnailPath = fs.realpathSync(output_path, []) + '/'

const downloadImage = async (url) => {
    const path = imagePath + '/' + new Date().getTime() + '.jpg'
    const writer = fs.createWriteStream(path)
    const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream'
    })

    response.data.pipe(writer)
    new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })
    return path
}

const generateThumbnail = async () => {
    const image = await downloadImage()
    await thumbnailsGenerator(image, thumbnailPath)
}

generateThumbnail()