var express = require('express');
var when = require('when');
var controller = require('../controller/loginController.js');

var router = express.Router();

router.route('/').post(authenticateUser);

function authenticateUser(req, res, next) {
	// if(req.body)   TODO: verify if check is to be applied
	var options = null;
	when(controller.authenticateUser(req.body, options),
		function success(token) {
			res.send(token);
		},
		function error(err) {
			res.send(err);
		});
}

module.exports = router;