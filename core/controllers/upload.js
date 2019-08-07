let app = require("express")();
let bodyParser = require("body-parser");
const multer = require('multer')
const PORT = 3000;

app.use(bodyParser.json())

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images') // doesn't work if folder doesn't already exist
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({ storage: Storage })

app.post('/upload/photo', upload.array('photo', 3), (req, res) => {
  console.log('file', req.files)
  console.log('body', req.body)
  res.send({
  	status: 200
  })
})

app.listen(PORT, function (req, res) {
    console.log("Listening on port 3000...");
});