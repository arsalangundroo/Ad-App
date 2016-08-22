var authCredentialsStore = require('../DAL/store/authCredentialsStore.js');
var jwt = require('jsonwebtoken');
var config = require('../config.js');

function authenticateUser(loginCredentials, options) {
	//TODO: check if both login credentials are present.
	var promise = new Promise(
		function(resolve, reject) {
			function successGet(tokenCredentials) {
				//TODO : Build token
				var authToken = buildAuthToken(tokenCredentials);
				resolve(authToken);
			}

			function errorGet(err) {
				reject(err);
			}
			//TODO: encrypt password before sending it in.
			authCredentialsStore.getAuthCredentialsForLogin(loginCredentials).then(successGet, errorGet);
		}
	);
	return promise;
}

function buildAuthToken(tokenCredentials) {
	console.log('bld tkn');
	console.log(config.token_encryption_key);
	var authToken = jwt.sign(tokenCredentials, config.token_encryption_key);
	return authToken;
}

exports.authenticateUser = authenticateUser;