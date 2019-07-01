const app = require('express')()

app.listen(9080, () => console.log("On 9080"))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})