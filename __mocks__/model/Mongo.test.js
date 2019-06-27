var Business = require('../Businesses').businesses
var countLength = (obj) => {
    var i = 0
    for (item in obj) {
        i++
    }
    return i
}

var toArray = (obj) => {
    var fetchedArray = []
    for (item in obj) {
        fetchedArray.push({
            key: item,
            value: obj[item]
        })
    }
    return fetchedArray
}

var DB = {
    data:  null,
    setData: (e) => data = e,
    find: async (obj) => {
        var fetchedArray = toArray(obj)
        var comparedItems = []
        data.forEach(element => {
            var count = 0
            for (let j = 0; j < fetchedArray.length; ++j) {
                var key = fetchedArray[j].key
                var value = fetchedArray[j].value
                if (element[key] === value) {
                    count++
                }
            }
            if (fetchedArray.length === count) {
                comparedItems.push(element)
            }
        })
        return comparedItems
    },
    findOne: async (obj) => {
        var fetchedArray = toArray(obj)
        data.forEach(element => {
            var count = 0
            for (let j = 0; j < fetchedArray.length; ++j) {
                var key = fetchedArray[j].key
                var value = fetchedArray[j].value
                if (element[key] === value) {
                    count++
                }
            }
            if (fetchedArray.length === count) {
                return element
            }
        })
    }
}

test('should ', async () => {
    DB.setData(Business)
    DB.find({ placePrice: 1, placeCategory: 3 })
    const response = await 
    expect(1).toBe(1)
});