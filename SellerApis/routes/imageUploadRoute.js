var express = require('express');
var router=express.Router();
router.route('/adImages').post(addImages);

var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, req.destination_path);
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).array('adImage',10);


function addImages(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
};
module.exports = router;