const Places = require('../__mocks__/Places')

function getSuggestion(fetchedString) {
    if (fetchedString == null || typeof fetchedString != "string") {
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
    var sameStringCheck = []
    var majorOrMinor = null
    var placeToBePushed = null
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
        } else if (fetchedString.length < 4) {
            pattern = "^" + fetchedString
        }
        regex = new RegExp(pattern, "i")
        matched = Places[i].minor.search(regex)        
        pattern = "^" + fetchedString
        matched = Places[i].minor.search(regex)
        if (matched >= 0) {
            placesReturned.push(Places[i].minor)
        }
    }

    return {
        status: 200,
        suggestions: placesReturned
    }

}


function test() {
    const response = getSuggestion("bole, add")
    console.log(response)
}

//test()

module.exports = getSuggestion