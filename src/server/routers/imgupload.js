var multer  = require('multer')
module.exports = function(){

var storage = multer.diskStorage({
  destination: "src/client/pollcomponent/upload/images/",
  filename: function (req, file, cb) {
    console.log('file.originalname.split(.)',file.originalname.split('.'))
    var expname=file.originalname.split('.').pop()
    cb(null, file.fieldname + '-' + Date.now()+'.'+expname)
  }
})

var upload = multer({ storage:storage })
return upload;
}
