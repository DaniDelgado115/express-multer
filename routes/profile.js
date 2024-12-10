var express = require('express');
var router = express.Router();
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      const extension=file.originalname.split('.').pop()
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+'.'+extension
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })
/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('form.html');
});



router.post('/', upload.single('avatar'), function (req, res, next) {
    console.log(req.file)
    // req.body will hold the text fields, if there were any
    res.send("Jasota")
})


module.exports = router;
