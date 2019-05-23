var mongoose = require('mongoose')
var db = require('./keys').MongoURI

module.exports = {
    connect: () => {
        mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true } )
        .then(success => console.log("Connected"))
        .catch(err => console.log("Error Occured While Connecting to the database. Trying again..."))
    }
}