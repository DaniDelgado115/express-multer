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
    },
    fileFilter: function(req, file, cb) {
      if (file.fileSize<2 * 1024 * 1024 && (file.mimetype === 'image/png' || file.mimetype === 'image/jpg')){
        cb(null, true);
      } else{
        cb(null, false);
        print ("handiegia da artxiboa")
      }
    }
  })
  
  const upload = multer({ storage: storage});
    /* GET home page. */
    router.get('/', function(req, res, next) {
    res.redirect('form.html');
  });



router.post('/', upload.single('avatar'), function (req, res, next) {
    console.log(req.file)
    // req.body will hold the text fields, if there were any
    const fileUrl = `/uploads/${req.file.filename}`;
    res.send(`
      <p>Zure izena: ${req.body.name}</p>
      <p>Fitxategia: <a href="${fileUrl}">${fileUrl}</a></p>
  `)
})


module.exports = router;
