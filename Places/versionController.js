function versionController() {
    var day = new Date()
    const date = day.getDate()
    const month = day.getMonth() + 1
    const year = day.getFullYear()
    var version = year
    version *= 100
    version += month
    version *= 100
    version += date

    return version
}

module.exports = versionController