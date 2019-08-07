var mongoose = require('mongoose')
var db = require('./keys').MongoURI
var localDB = require('./keys').local
const { setLocalDB } = require('./env')

var url = null
if (setLocalDB) {
    url = localDB
} else {
    url = db
}

module.exports = async () => {
        mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true } )
            .then(res => {
                console.log("Connected")
                return false
            })
            .catch(err => {
                console.log("Error Occured While Connecting to the database. Trying again...")
                return true
            })
    }
