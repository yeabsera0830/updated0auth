const User = require('../../../model/User')
const { setLocalDB, localUrl, herokuUrl } = require('../../../config/env')
var link = null
if (setLocalDB) link = localUrl
else link = herokuUrl


async function searchPerson(id) {
    const found = await User.findOne({ id: id })
    if (found == null) {
        return {
            status: 400,
            message: "User could not be found"
        }
    }

    if (found.firstName == null) {
        return {
            status: 200,
            person: {
                name: "Anonymous",
                profilePicture: (setLocalDB)? link + '/store/ak2q78ticmbf67hxbdnagdpvhsi3n58gercsn4kzcb1dhkix2wfd1n8zzeoe2s4t1rz2me1cb1563649486615.jpeg' : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp-MLoHVHXxaOFY6k-ZTqEkQr4Di_p-gfbWI9Mhq--x16i18tYPA"
            }
        }
    } else if (found.middleName != null && found.lastName != null) {
        return {
            status: 200,
            person: {
                name: found.firstName + ' ' + found.middleName + ' ' + found.lastName,
                profilePicture: found.profilePicture
            }
        }
    } else if (found.lastName != null) {
        return {
            status: 200,
            person: {
                name: found.firstName + ' ' + found.lastName,
                profilePicture: found.profilePicture
            }
        }
    } else {
        return {
            status: 200,
            person: {
                name: found.firstName,
                profilePicture: found.profilePicture
            }
        }
    }

    
}

module.exports = searchPerson