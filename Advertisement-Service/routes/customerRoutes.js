var express = require('express');
var when = require('when');
var controller = require('../controller/customerController.js');
var router = express.Router();

router.route('/:sellerId/list').get(getAdsFromSeller);
router.route('/:id/get').get(getAdById);

function getAdsFromSeller(req, res, next) {
	var options = {};
	if (req.query.psize) {
		options.psize = req.query.psize;
	}
	if (req.query.pnum) {
		options.pnum = req.query.pnum;
	}
	when(controller.getAdsFromSeller(req.params.sellerId, options),
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

module.exports = router;