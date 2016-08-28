var express = require('express');
var when = require('when');
var controller = require('../controller/accessAuthController.js');

var router = express.Router();

router.route('/').post(authenticateUser);

function authenticateUser(req, res, next) {
	// if(req.body)   TODO: verify if check is to be applied
	var options = null;
	// req.body={token:token,user_role:'role' }
	when(controller.authenticateUser(req.body.token, req.body.user_role, options),
		function success(authentication) {
			res.send({
				'authentication': authentication
			});
		},
		function error(err) {
			res.send({
				'authenticity': false,
				additionalInfo: err
			});
		});
}

module.exports = router;