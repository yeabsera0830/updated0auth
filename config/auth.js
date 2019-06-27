var mongoose = require('mongoose')
var db = require('./keys').MongoURI

module.exports = {
    connect1: () => {
        mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true } )
        .then(success => {
            console.log("Connected")
            return false
        })
        .catch(async err => {
            console.log("Error Occured While Connecting to the database. Trying again...")
        })
    },
    connect: async () => {
        mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true } )
            .then(res => {
                console.log("Connected")
                return false
            })
            .catch(err => {
                console.log(err)
                return true
            })
    }
}