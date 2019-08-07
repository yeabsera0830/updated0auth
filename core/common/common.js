exports.arrayToString = arr => {
    return arr.toString()
}

exports.stringToArray = str => {
    var trimedArray = []
    const arr = str.split(",")
    if (arr.length > 0) {
        arr.forEach(element => {
            element = element.trim()
            trimedArray.push(element)
        })
    }
    return trimedArray
}

exports.objToString = obj => {
    var str = ""
    for (item in obj) {
        str += item + ":" + obj[item] + ","
    }
    return str.slice(0, str.length - 1)
}

exports.strToObject = str => {
    var obj = {}
    var arr = str.split(",")
    if (arr.length > 0) {
        arr.forEach(element => {
            element = element.trim()
            partials = element.split(":")
            partials[0] = partials[0].trim()
            obj[partials[0]] = ""
            for (let i = 1; i < partials.length; ++i) {
                obj[partials[0]] += partials[i].trim() + ":"
            }
            obj[partials[0]] = obj[partials[0]].slice(0, obj[partials[0]].length - 1)
        })
    }
    return obj
}