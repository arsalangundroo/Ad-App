var express = require('express');
var when = require('when');
var controller=require('../controller/advertisementController.js');
var router=express.Router();

router.route('/create').post(createAd);

var accountId = '123dada';

function createAd(req,res,next){
	var options ={};
     when(controller.createAd(accountId,req.body,options),
		function success(createdAd) {
			res.send(createdAd);
			//return next();
		},
		function error(err) {
			res.send(err);
			//return next(err); 
		});
}

module.exports=router;