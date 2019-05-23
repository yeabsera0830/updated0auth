const Places = require('../__mocks__/Places')

function getSuggestion(fetchedString) {
    if (fetchedString == null) {
        return {
            status: 400,
            message: "Please send a string"
        }
    }

    var placesReturned = []
    var matched = null
    var regex = null
    var pattern = null
    var checkComma = null
    var fetchedArray = null
    var checkMajor = false
    var checkMinor = false
    var anotherPatten = null
    var anotherMatch = null
    var anotherRegex = null
    for (let i = 0; i < Places.length; ++i) {
        checkMajor = false
        checkMinor = false
        checkComma = fetchedString.search(',')
        if (checkComma > 0) {
            fetchedArray = fetchedString.split(',')
            if (fetchedArray.length != 2) {
                return {
                    status: 400,
                    message: "Enter the city and the sub city"
                }
            }
            
            if (fetchedArray[0] == " " || fetchedArray[1] == " " || fetchedArray[0] == "" || fetchedArray[1] == "") {
                return {
                    status: 400,
                    message: "Enter the city and the sub city"
                }
            }

            pattern = fetchedArray[0]
            if (fetchedArray[0].length < 2) {
                pattern = "^" + fetchedArray
                regex = new RegExp(pattern, "ig")
                matched = Places[i].minor.search(regex)
            }
            regex = new RegExp(pattern, "i")
            matched = Places[i].major.search(regex)
            if (matched >= 0) {
                checkMajor = true
            }
            if (!checkMajor) {
                matched = Places[i].minor.search(regex)
                if (matched >= 0 && placesReturned.indexOf(Places[i].minor) === -1 && pattern != " ") {
                    checkMinor = true
                }
            }
            
            pattern = fetchedArray[1]

            pattern = fetchedArray[1]
            if (fetchedArray[1].length < 2) {
                pattern = "^" + fetchedArray
            }
            regex = new RegExp(pattern, "i")
            if (!checkMajor) {
                matched = Places[i].major.search(regex)
                if (matched < 0) {
                    checkMajor = true
                }
            }

            if (checkMajor && checkMinor) {
                placesReturned.push(Places[i].minor)
            }
        }
        else if (fetchedString.length > 4) {
            pattern = "" + fetchedString
            anotherPatten = "[A-Za-z]+\s " + fetchedString 
        } else if (fetchedString.length < 4) {
            pattern = "^" + fetchedString
            anotherPatten = "[A-z]+\s " + fetchedString
        }
        regex = new RegExp(pattern, "i")
        anotherRegex = new RegExp(anotherPatten, "i")
        matched = Places[i].minor.search(regex)        
        anotherMatch = Places[i].minor.search(anotherRegex)
        console.log("Place to be checked: " + Places[i].minor + ": ")
        if (matched >= 0 || anotherMatch >= 0) {
            placesReturned.push(Places[i].minor)
            console.log("matched: " + fetchedString + ": " + matched)
            console.log("anotherMatch: " + fetchedString + ": " + anotherMatch)
        }
    }

    return {
        status: 200,
        suggestions: placesReturned
    }

}


function searchPlaceString(fullStr, str) {
    var partials = fullStr.split(" ")
    var toBeChecked = null
    var pattern = new RegExp("^" + str, "i")
    var match = null
    if (partials.length > 1) {
        for (let i = 0; i < partials.length; ++i) {
            toBeChecked = partials[i]
            match = toBeChecked.search(pattern)
            if (match >= 0) {
                //console.log("Found " + toBeChecked + ": " + match)
                return true
            }
        }
    }
    else {
        match = fullStr.search(pattern)
        if (match >= 0) {
            //console.log("Found " + fullStr + ": " + match)
            return true
        }
    }
    return false
}

function searchPlace(stringFetched) {
    var placesToBeReturned = []
    for (let i = 0; i < Places.length; ++i) {
        //console.log(Places[i].minor + ": " + searchPlaceString(Places[i].minor, stringFetched))
        if (searchPlaceString(Places[i].minor, stringFetched)) {
            placesToBeReturned.push("" + Places[i].minor + ", " + Places[i].major)
        }
    }
    return placesToBeReturned
}

function searchMajor(major, majorString) {
    var partials = ""
    var partialFlag = false
    var majorPartials = majorString.split(" ")
    if (majorPartials.length < 2) {
        partials = major.split(" ")
        partialFlag = true
    }
    var cityPattern = null
    var match = null
    var toBeChecked = null
    if (partials.length > 1 && partialFlag) {
        for (let i = 0; i < partials.length; ++i) {
            toBeChecked = partials[i]
            cityPattern = new RegExp(toBeChecked, "i")
            match = toBeChecked.search(cityPattern)
            if (match >= 0) {
                return true
            }
        }
    } else {
        cityPattern = new RegExp("^" + majorString, "i")
        for (let i = 0; i < Places.length; ++i) {
            match = major.search(cityPattern)
            if (match >= 0) {
                return true
            }
        }
    }

    return false
}

function searchMinor(minor, minorString) {
    var partials = ""
    var partialFlag = false
    var minorPartials = minorString.split(" ")
    if (minorPartials.length < 2) {
        partials = minor.split(" ")
        partialFlag = true
    }
    var minorPattern = null
    var match = null
    var toBeChecked = null
    if (partials.length > 1 && partialFlag) {
        for (let i = 0; i < partials.length; ++i) {
            toBeChecked = partials[i]
            minorPattern = new RegExp("\s*" + minorString)
            match = toBeChecked.search(minorPattern)
            if (match >= 0) {
                return true
            }
        }
    } else {
        minorPattern = new RegExp(minorString, "i")
        for (let i = 0; i < Places.length; ++i) {
            match = minor.search(minorPattern)
            if (match >= 0) {
                return true
            }
        }
    }

    return false
}

function checkMajor(major) {
    for (let i = 0; i < Places.length; ++i) {
        if (searchMajor(Places[i].major, major)) {
            return true
        }
    }

    return false
}

function checkMinor(minor) {
    for (let i = 0; i < Places.length; ++i) {
        if (searchMinor(Places[i].minor, minor)) {
            return true
        }
    }

    return false
}

function _getSuggestion(stringFetched) {
    var commaPartials = stringFetched.split(",")
    var whiteSpacePartials = stringFetched.split(" ")
    var commaFlag = false
    var whiteSpaceFlag = false
    var majorChecked = false
    var minorChecked = false
    var toBeChecked = null
    

    if (commaPartials.length > 1) {
        commaFlag = true
    } else {
        commaFlag = false
    }

    if (whiteSpacePartials.length > 1) {
        whiteSpaceFlag = true
    } else {
        whiteSpaceFlag = false
    }

    if (commaFlag) {
        for (let i = 0; i < commaPartials.length; ++i) {
            toBeChecked = commaPartials[i]
            console.log(toBeChecked)
            if (checkMajor(toBeChecked)) {
                majorChecked = true
            } else {
                if (checkMinor(toBeChecked)) {
                    minorChecked = true
                }
            }
        }
    }

    console.log(majorChecked)
    console.log(minorChecked)

}

function smaller(str) {
    var re = /^\s*\w+\s*/ig;
    //var str = ' fee fi fo fum';
    //var myArray = str.match(re);
    //console.log(myArray);
    a = "now"
    p = new RegExp("\s*" + a)
    //var pattern = new RegExp("^\\s*" + str, "g")
    //console.log(p)
    var s = "    now"
    var match = s.search(p)
    console.log(match)
}

function test() {
    //const response = getSuggestion("k")
    //console.log(response)
    //for (let i = 0; i < Places.length; ++i) {
    //    searchPlaceString(Places[i].minor, "k")
    //}
    //searchPlace("l")
    //console.log(searchMajor("Addis Ababa", "addis"))
    //console.log(checkMajor("Addis Ababa"))
    //console.log(checkMinor(" Bole"))
    //console.log(searchMinor("Kolfe Keraniyo", "kel"))
    _getSuggestion("Addis Ababa, Bole")
    //smaller("n")
}

test()

module.exports = getSuggestion