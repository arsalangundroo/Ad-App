var Advertisement= require('../models/advertisements');
var express = require('express');
var router=express.Router();

router.route(':id/get').post(createAd);

function createAd(req,res,next){

}

module.exports = router;