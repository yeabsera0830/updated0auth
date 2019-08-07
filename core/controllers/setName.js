function setName(name) {
    var names = []
    name = name.trim()
    names = name.split(" ")
    var nameObject = {}

    nameObject.firstName = names[0]
    if (names.length === 3) {
        nameObject.middleName = names[1]
        nameObject.lastName = names[2]
    } else if (names.length === 2) {
        nameObject.lastName = names[1]
    } else if (names.length > 3) {
        nameObject.middleName = names[1]
        nameObject.lastName = ""
        for (let i = 2; i < names.length; ++i) {
            nameObject.lastName += names[i] + " "
        } 
    }
    
    return nameObject
}

module.exports = setName