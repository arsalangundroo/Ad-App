var authCredentialsStore = require('../DAL/store/authCredentialsStore.js');
var jwt = require('jsonwebtoken');

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
	var authToken = jwt.sign(tokenCredentials, app.get('token_encryption_key'), {
		expiresInMinutes: 1440 // expires in 24 hours
	});
}

exports.authenticateUser = authenticateUser;