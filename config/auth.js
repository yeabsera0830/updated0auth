var mongoose = require('mongoose')
var db = require('./keys').MongoURI

module.exports = {
    connect: () => {
        mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true } )
    }
}