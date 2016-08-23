var express = require('express');
var when = require('when');
var controller = require('../controller/accessAuthController.js');

var router = express.Router();

router.route('/').post(authenticateUser);

function authenticateToken(req, res, next) {
	// if(req.body)   TODO: verify if check is to be applied
	var options = null;
// req.body={token:token,role:'role' }
	when(controller.authenticateUser(req.body, options),
		function success(authenticity) {
			res.send({'authenticity':authenticity});
		},
		function error(err) {
			res.send({'authenticity':false,additionalInfo:err});
		});
}
}

module.exports = router;