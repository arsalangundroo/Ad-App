var express = require('express');
var router = express.Router();
var AuthCredentials = require('../DAL/models/authCredentials.js');


/* GET users listing. */
router.post('/', function(req, res, next) {
  //res.send('respond with a resource');
      var auth_creds = new AuthCredentials();
      auth_creds.email  = req.body.email;
      auth_creds.password = req.body.password;
      auth_creds.role = req.body.role;
			auth_creds.save()
				.then(function successSave(savedCreds) {
					res.send(savedCreds);
					},
					function errorSave(err) {
						next(err);
					});
		
});

module.exports = router;
