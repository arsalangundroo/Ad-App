var express = require('express');
var when = require('when');
var controller = require('../controller/sellerController.js');
var router = express.Router();
var request =require('request');

router.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    var requestData = {
      "token": token,
      "user_role": "seller"
    };
    request({
      url: "http://localhost:3300/access_authentication/",
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
      },
      body: requestData
    }, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body)
        if (body.authentication && body.authentication.valid === true) {
          req.body.accountId = body.authentication.accountId;
          console.log("Authenticated!!!!!!!!!!!!");
          next();
        } else {
          res.status(403);
          res.send({
            message: "Invalid Access!!"
          });
        }
      } else {
        console.log("error: " + error);
        console.log("response.statusCode: " + response.statusCode);
        console.log("response.statusText: " + response.statusText);
        return res.status(403).send({
          success: false,
          message: 'Could not authenticate the request.'
        });
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

router.route('/create').post(createAd);
router.route('/list').get(getAdsForAccount);
router.route('/:id/get').get(getAdById);
router.route('/:id/delete').delete(deleteAd);
router.route('/:id/update').post(updateAd);

//var accountId = '57ba6314623c5d1a7b6e824d';

function createAd(req, res, next) {
	var options = {};
	when(controller.createAd(req.body.accountId, req.body, options),
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