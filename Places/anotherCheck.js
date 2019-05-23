const arrayObject = require('../__mocks__/Places')

var partials = null
var minorPattern = null
var majorPattern = null
var matchMajor = null
var matchMinor = null
var whiteSpacePartials = null

function trimArray(arr) {
    for (let i = 0; i < arr.length; ++i) {
        arr[i] = arr[i].trim()
    }
    return arr
}


function checkPlace(arr, place) {
    const index = arr.indexOf(place)
    if (index < 0) {
        return true
    } else {
        return false
    }
}

function getSuggestions(fetchedString) {
    if (fetchedString == null) {
        return {
            status: 400,
            message: "Please Enter Something"
        }
    }

    partials = fetchedString.split(',')
    partials = trimArray(partials)
    var places = []
    var placeObject = {}

    if (partials.length > 1) {
        for (let i = 0; i < partials.length; ++i) {
            if (partials[i] === "") {
                continue
            }
            minorPattern = new RegExp("^" + partials[i], "gi")
    
            // Finding the minor
            for (let j = 0; j < arrayObject.length; ++j) {
                whiteSpacePartials = arrayObject[j].minor.split(" ")
                if (whiteSpacePartials.length > 1) {
                    for (let k = 0; k < whiteSpacePartials.length; k++) {
                        if (whiteSpacePartials[k] == "") {
                            continue
                        }
                        matchMinor = whiteSpacePartials[k].match(minorPattern)
                        if (matchMinor != null) {
                            placeObject = {
                                major: arrayObject[j].major,
                                minor: arrayObject[j].major
                            }
                            if (checkPlace(places, placeObject)) {
                                places.push(placeObject)
                                checkMinor = true
                            }
                        }
                    }
                } else {
                    matchMinor = arrayObject[j].minor.match(minorPattern)
                    if (matchMinor != null) {
                        placeObject = {
                            major: arrayObject[j].major,
                            minor: arrayObject[j].major
                        }
                        if (checkPlace(places, placeObject)) {
                            places.push(placeObject)
                            checkMinor = true
                        }
                    }
                }
            }
            if (matchMinor != null) {
                continue
            }
            
            majorPattern = new RegExp("^" + partials[i], "gi")
            for (let j = 0; j < arrayObject.length; ++j) {
                whiteSpacePartials = arrayObject[j].major.split(" ")
                if (whiteSpacePartials.length > 1) {
                    for (let k = 0; k < whiteSpacePartials.length; ++k) {
                        if (whiteSpacePartials[k] == "") {
                            continue
                        }
                        matchMajor = whiteSpacePartials[k].match(majorPattern)
                        if (matchMajor != null) {
                            checkMajor = true
                            break
                        }
                    }
                } else {
                    matchMajor = arrayObject[j].major.match(majorPattern)
                    if (matchMajor != null) {
                        checkMajor = true
                        break
                    }
                }
            }
        }
    
        
    } else {
        fetchedString = fetchedString.trim()
        if (fetchedString != "") {
            minorPattern = new RegExp("^" + fetchedString, "gi")
            majorPattern = new RegExp("^" + fetchedString, "gi")
            for (let i = 0; i < arrayObject.length; ++i) {
                whiteSpacePartials = arrayObject[i].minor.split(" ")
                if (whiteSpacePartials.length > 1) {
                    for (let j = 0; j < whiteSpacePartials.length; j++) {
                        if (whiteSpacePartials[j] == "") {
                            continue
                        }
                        matchMinor = whiteSpacePartials[j].match(minorPattern)
                        if (matchMinor != null) {
                            placeObject = {
                                major: arrayObject[i].major,
                                minor: arrayObject[i].minor
                            }
                            if (checkPlace(places, placeObject)) {
                                places.push(placeObject)
                                checkMinor = true
                            }
                        }
                    }
                } else {
                    matchMinor = arrayObject[i].minor.match(minorPattern)
                    if (matchMinor != null) {
                        checkMinor = true
                        placeObject = {
                            major: arrayObject[i].major,
                            minor: arrayObject[i].minor
                        }
                        if (checkPlace(places, placeObject)) {
                            places.push(placeObject)
                            checkMinor = true
                        }
                    }
        
                    matchMajor = arrayObject[i].major.match(majorPattern)
                    if (matchMajor != null) {
                        checkMajor = true
                    }
                }
            }
        } else {
            return {
                status: 400,
                message: "Please Enter Something"
            }
        }
    }

    var finalCheck = fetchedString.split(" ")
    if (places.length < 1 && finalCheck.length > 1) {
        minorPatter = new RegExp("^" + finalCheck, "ig")
        for (let i = 0; i < arrayObject.length; ++i) {
            matchMinor = null
            matchMinor = arrayObject[i].minor.match(minorPattern)
            if (matchMinor != null) {
                placeObject = {
                    major: arrayObject[i].major,
                    minor: arrayObject[i].minor
                }
                if (checkPlace(places, placeObject)) {
                    places.push(placeObject)
                    return {
                        status: 200,
                        suggesstions: places
                    }
                }
            }
        }

        for (let i = 0; i < finalCheck.length; ++i) {
            minorPattern = new RegExp("^" + finalCheck[i], "i")
            for (let j = 0; j < arrayObject.length; ++j) {
                matchMinor = null
                matchMinor = arrayObject[j].minor.match(minorPattern)
                if (matchMinor != null) {
                    placeObject = {
                        major: arrayObject[j].major,
                        minor: arrayObject[j].minor
                    }
                    if (checkPlace(places, placeObject)) {
                        places.push(placeObject)
                        return {
                            status: 200,
                            suggesstions: places
                        }
                    }
                }
            }
        }
    }
    

    return {
        status: 200,
        suggesstions: places
    }
}

function test() {
    const name = "add"
    const response = getSuggestions(name)
    console.log(response)
}

test()

module.exports = getSuggestions