function checkAppSecret(appSecret) {
    if (appSecret == "12345") {
        return false
    } else {
        return true
    }
}

module.exports = checkAppSecret