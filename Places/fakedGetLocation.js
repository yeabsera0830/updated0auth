const Places = [
    {
        id: 1,
        name: "Bole",
        latitude: 8.986046,
        longitude: 38.796338
    },
    
    {
        id: 2,
        name: "Piassa",
        latitude: 9.036729,
        longitude: 38.755658
    },

    {
        id: 3,
        name: "Jemo",
        latitude: 8.958600,
        longitude: 38.713438
    },

    {
        id: 4,
        name: "Megenagna",
        latitude: 9.020692,
        longitude: 9.020692
    },

    {
        id: 5,
        name: "Mexico",
        latitude: 9.010441,
        longitude: 9.010441
    },

    {
        id: 6,
        name: "Goro",
        latitude: 8.996110,
        longitude: 38.830947
    }
]

function getDistance(x, x1, y, y1) {
    let horizontal = Math.pow((x - x1), 2)
    let vertical = Math.pow((y - y1), 2)
    return Math.sqrt(horizontal + vertical)
}

function getNearestPlace(latitude, longitude) {
    let smallest = getDistance(latitude, Places[0].latitude, longitude, Places[0].longitude)
    let index = 0
    for (var i = 0; i < Places.length; ++i) {
        distance = getDistance(latitude, Places[i].latitude, longitude, Places[i].longitude)
        if (smallest > distance) {
            smallest = distance
            index = i
        }
    }
    return {
        status: 200,
        place: Places[index].name
    }
}

module.exports = getNearestPlace