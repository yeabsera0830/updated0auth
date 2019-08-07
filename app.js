const express = require('express')
const app = express()

const { TESTING, PORT } = require('./config/env')
const connect = require('./config/auth')
const Routes = require('./core/Routes')

app.use(express.json())

var server = null
exports.startServer = async () => {
    server = app.listen(PORT, () => console.log("Server Running on *:" + PORT))
    if (!TESTING) {
        await connect()
    }
}

exports.closeServer = () => {
    server.close()
}

if (!TESTING) {
    exports.startServer()
}

// Middlewares
app.use(Routes['root'], require('./core/index'))
app.use(Routes['signup'], require('./core/Signup/signup'))
app.use(Routes['login'], require('./core/Login/login'))
app.use(Routes['address'], require('./core/Address/address'))
app.use(Routes['place'], require('./core/Place/place'))
app.use(Routes['search'], require('./core/Search/search'))
app.use(Routes['categories'], require('./core/Categories/categories'))
app.use(Routes['bookmarks'], require('./core/Bookmark/bookmark'))
app.use(Routes['review'], require('./core/Review/review'))