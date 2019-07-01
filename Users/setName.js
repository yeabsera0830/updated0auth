function setName(name) {
    var names = []
    name = name.trim()
    names = name.split(" ")
    var nameObject = {}
    if (names.length > 3 || names.length < 2) {
        return {
            status: 200,
            message: "Incorrect name format"
        }
    }

    nameObject.firstName = names[0]

    if (names.length === 3) {
        nameObject.middleName = names[1]
        nameObject.lastName = names[2]
    } else {
        nameObject.lastName = names[1]
    }
    
    return nameObject
}

module.exports = setName