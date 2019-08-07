const User = require('../model/User')
const Place = require('../model/Place')
const { localUrl, PORT } = require('../config/env')
const os = require('os').networkInterfaces()
var LAN = null
if (os['wlp2s0'] != undefined) LAN = 'http://' + os['wlp2s0'][0]['address'] + ':' + PORT
else LAN = localUrl

const placePictures = [
    LAN + '/store/l8hdvggh91ft9hiji3h2g6kua7bc7ts52lux4rab3elz81j1tupwxienpl68ujjg5wl25zrc84v1563653803535.jpeg',
    LAN + '/store/asdlf0fc4iohjchmf5q2hlxmdslmkvj7f7bdojcn5i0ievmobgrkpdur08s2hst7s2o3jti5v5rm1563653848378.jpeg',
    LAN + '/store/funu4dvut8brkig98iazmc1rv1t3e9cdpciivj8ttoh4xvnbz1it8bm6215m9gwt464wwqkq5nb9g1563653862498.jpeg',
    LAN + '/store/z2yjpggm6eq8ddguz84m9vwhwkut7qamcv16nr827014mnrxcmwguexolstlgcepgw80b5cl7m51563653877582.jpeg',
    LAN + '/store/z3e04w0ft2n2f8xu9tsao7vnffxvbl6zp2fz5n1995ozhid9u7t5c41qt5q905aa56ceydbhsa1563653898493.jpeg',
    LAN + '/store/y8j1mpicpqmj0bczqbsrsv14g4wz5bbik7u88o7za5o7oxannrl71arjhv4npm88fvhtjyxxs4u1563653917300.jpeg',
    LAN + '/store/qfmvigf2ogg2f7b7w8zf1jpkb4yrv62bdpfomao55nw8acd1uelt4ymo3ip4su9bjmummppepj1o1563653932238.jpeg'
]

const userPictures = [
    LAN + '/store/i5gizky9b1acahwp5rk2481orrz3joercbq38iaghxl7j4ha4cz0i7bvsuf389yvvqduuwzmtb30v1563653983669.jpeg',
    LAN + '/store/4kfw38ovcf63i3rkl88vredw9nie852v0o2x212xlt59zogogp7d2zoz013mh97wbumxq2bd89ec1563653995886.jpeg',
    LAN + '/store/34mxbu4n18e6xr83uv2dnn0fonw8wmzovcwkryohn6xjwgmgp420cgouh33v9svp1mdq33pirlj1563654012134.jpeg'
]

function rand(max, min) {
    return Math.floor(Math.random() * (max - min + 1) ) + min
}

exports.updateUsers = async () => {
    const count = await User.countDocuments()
    for (let i = 0; i < count; ++i) {
        User.updateOne({ id: (i+1) }, { profilePicture: userPictures[rand(userPictures.length - 1, 0)] })
            .then(res => console.log("User updated"))
            .catch(err => console.error(err))
    }
}

exports.updatePlaces = async () => {
    const count = await Place.countDocuments()
    for (let i = 0; i < count; ++i) {
        placePhotos = []
        for(let j = 0; j < rand(placePictures.length, 0); ++j) {
            placePhotos.push(placePictures[rand(placePictures.length - 1, 0)])
        }
        Place.updateOne({ placeID: (i+1) }, {
            placeProfilePicture: placePictures[rand(placePictures.length - 1, 0)],
            placePhotos: placePhotos
        }).then(res => console.log("Place updated")).catch(err => console.error(err))
    }
}