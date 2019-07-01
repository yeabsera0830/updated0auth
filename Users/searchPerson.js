const User = require('../model/User')

async function searchPerson(id) {
    const found = await User.findOne({ id: id })
    if (found == null) {
        return {
            status: 400,
            message: "User could not be found"
        }
    }

    if (found.firstName == null || found.middleName == null || found.lastName == null) {
        return {
            status: 200,
            person: {
                name: "No Name",
                profilePicture: "https://images.unsplash.com/photo-1515191107209-c28698631303?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"
            }
        }
    }

    return {
        status: 200,
        person: {
            name: found.firstName + ' ' + found.middleName + ' ' + found.lastName,
            profilePicture: found.profilePicture
        }
    }
}

module.exports = searchPerson