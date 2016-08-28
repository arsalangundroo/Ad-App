var authCredentialsStore = require('../DAL/store/authCredentialsStore.js');
var jwt = require('jsonwebtoken');
var config = require('../config.js');

function authenticateUser(userToken, userRole, options) {
	//TODO: check if both login credentials are present.
	var promise = new Promise(
		function(resolve, reject) {

			function successGet(authentication) {
				//TODO : Build token
				resolve(authentication);
			}

			function errorGet(err) {
				reject(err);
			}

			jwt.verify(userToken, config.token_encryption_key, function(err, tokenCredentials) {
				if (err) {
					reject(err);
				} else {
					if (tokenCredentials._doc.role !== userRole) {
						reject({
							message: 'User not authorized for this role'
						});
					} else {
						authCredentialsStore.checkTokenCredentialsInDB(tokenCredentials._doc).then(successGet, errorGet);
					}
				}
			});
		});
	return promise;
}

exports.authenticateUser = authenticateUser;