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

    fetchedString = fetchedString.trim()
    partials = fetchedString.split(',')
    partials = trimArray(partials)
    var places = []
    var placeString = null
    if (partials.length > 1) {
        for (let i = 0; i < partials.length; ++i) {
            if (partials[i] === "") {
                continue
            }
            minorPattern = new RegExp("^" + partials[i], "gi")
    
            // Finding the minor
            for (let j = 0; j < arrayObject.length; ++j) {
                whiteSpacePartials = arrayObject[j].minor.split(" ")
                console.log(50 + " " + whiteSpacePartials)
                if (whiteSpacePartials.length > 1) {
                    for (let k = 0; k < whiteSpacePartials.length; k++) {
                        if (whiteSpacePartials[k] == "") {
                            continue
                        }
                        matchMinor = whiteSpacePartials[k].match(minorPattern)
                        if (matchMinor != null) {
                            placeObject = {
                                minor: arrayObject[j].minor,
                                major: arrayObject[j].major
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
                            minor: arrayObject[j].minor,
                            major: arrayObject[j].major
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
    
        
    }  else if (partials.length == 1) {
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
                                minor: arrayObject[j].minor,
                                major: arrayObject[j].major
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
                        placeString = arrayObject[i].minor + ", " + arrayObject[i].major
                        if (checkPlace(places, placeString)) {
                            places.push(placeString)
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
    finalCheck = fetchedString.split(" ")
    if (finalCheck.length > 1) {
        for (let i = 0; i < finalCheck.length; ++i) {
            minorPattern = new RegExp("^" + finalCheck[i])
            for (let j = 0; j < arrayObject.length; ++j) {
                whiteSpacePartials = arrayObject[j].minor.split(" ")
                if (whiteSpacePartials.length > 1) {
                    for (let k = 0; k < whiteSpacePartials.length; ++k) {
                        matchMinor = whiteSpacePartials[k].match(minorPattern)
                        if (matchMinor != null) {
                            placeString = arrayObject[j].minor + ", " + arrayObject[j].major
                            if (checkPlace(places, placeString)) {
                                places.push(placeString)
                                checkMinor = true
                            }
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
    const name = "l"
    const response = getSuggestions(name)
    console.log(response)
}

test()

module.exports = getSuggestions