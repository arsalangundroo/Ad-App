var express = require('express');
var when = require('when');
var controller = require('../controller/advertisementController.js');
var router = express.Router();

router.route('/create').post(createAd);
router.route('/list').get(getAdsForAccount);
router.route('/:id/get').get(getAdById);
router.route('/:id/delete').delete(deleteAd);
router.route('/:id/update').post(updateAd);

var accountId = '575d4191401ebb033ab1fba9';

function createAd(req, res, next) {
	var options = {};
	when(controller.createAd(accountId, req.body, options),
		function success(createdAd) {
			res.send(createdAd);
			//return next();
		},
		function error(err) {
			res.send(err);
			//return next(err); 
		});
}

function getAdsForAccount(req, res, next) {
	var options = {};
	if (req.query.psize) {
		options.psize = req.query.psize;
	}
	if (req.query.pnum) {
		options.pnum = req.query.pnum;
	}
	when(controller.getAdsForAccount(accountId, options),
		function success(adList) {
			res.send(adList);
		},
		function error(err) {
			res.send(err);
		});
}

function getAdById(req, res, next){
    var options = {};
	when(controller.getAdById(req.params.id, options),
		function success(advertisement) {
			res.send(advertisement);
		},
		function error(err) {
			res.send(err);
		});
}

function deleteAd(req, res, next){
	var options = {};
	when(controller.deleteAd(req.params.id, options),
		function success(result) {
			res.send(result);
		},
		function error(err) {
			res.send(err);
		});
}

function updateAd(req, res, next){
    var options = {};
	when(controller.updateAd(req.params.id, req.body, options),
		function success(updatedAdvertisement) {
			res.send(updatedAdvertisement);
		},
		function error(err) {
			res.send(err);
		});
}

module.exports = router;