const arrayObject = require('../__mocks__/Places')
const checkZeilaToken = require('./checkUser')
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

async function getCoordinatesFromAddress(accessToken, fetchedString) {
    const check = await checkZeilaToken(accessToken)
    if (check) {
        return {
            status: 400,
            message: "Could not find place with these coordinates"
        }
    }

    if (fetchedString === " " || fetchedString === "") {
        return {
            status: 400,
            message: "Please Enter Something"
        }
    }

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
            for (let j = 0; j < arrayObject.length; ++j) {
                whiteSpacePartials = arrayObject[j].minor.split(" ")
                if (whiteSpacePartials.length > 1) {
                    for (let k = 0; k < whiteSpacePartials.length; k++) {
                        if (whiteSpacePartials[k] == "") {
                            continue
                        }
                        matchMinor = whiteSpacePartials[k].match(minorPattern)
                        if (matchMinor != null) {
                            placeString = {
                                major: arrayObject[j].major,
                                minor: arrayObject[j].minor,
                                latidude: arrayObject[j].latitude,
                                longitude: arrayObject[j].longitude
                            }
                            if (checkPlace(places, placeString)) {
                                places.push(placeString)
                                checkMinor = true
                            }
                        }
                    }
                } else {
                    matchMinor = arrayObject[j].minor.match(minorPattern)
                    if (matchMinor != null) {
                        placeString = {
                            major: arrayObject[j].major,
                            minor: arrayObject[j].minor,
                            latidude: arrayObject[j].latitude,
                            longitude: arrayObject[j].longitude
                        }
                        if (checkPlace(places, placeString)) {
                            places.push(placeString)
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
                            placeString = {
                                major: arrayObject[i].major,
                                minor: arrayObject[i].minor,
                                latidude: arrayObject[i].latitude,
                                longitude: arrayObject[i].longitude
                            }
                            if (checkPlace(places, placeString)) {
                                places.push(placeString)
                                checkMinor = true
                            }
                        }
                    }
                } else {
                    matchMinor = arrayObject[i].minor.match(minorPattern)
                    if (matchMinor != null) {
                        checkMinor = true
                        placeString = {
                            major: arrayObject[i].major,
                            minor: arrayObject[i].minor,
                            latidude: arrayObject[i].latitude,
                            longitude: arrayObject[i].longitude
                        }
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

    if (places.length === 1) {
        return {
            status: 200,
            location: {
                latidude: places[0].latidude,
                longitude: places[0].longitude
            }
        }
    } else {
        return {
            status: 200,
            location: places
        }
    }
}

module.exports = getCoordinatesFromAddress

async function test() {
    const token = "a1pglv9yqnv2eztpa1yahi4i2ckw4swgmgkfpggl1uboj1bg79sj4rtxllb1a6e6je2l7jpaplynif0sq7145xsigg9gjb98"
    const response = await getCoordinatesFromAddress(token, "bole, addis")
    console.log(response)
}

//test()