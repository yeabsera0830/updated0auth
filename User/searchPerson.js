const User = require('../model/User')

async function searchPerson(id) {
    const found = await User.findOne({ id: id })
    return {
        status: 200,
        person: {
            name: found.firstName + ' ' + found.middleName + ' ' + found.lastName,
            profilePicture: found.profilePicture
        }
    }
}

module.exports = searchPerson