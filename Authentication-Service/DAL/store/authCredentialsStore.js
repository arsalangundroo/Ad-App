var AuthCredentials = require('../models/authCredentials.js');

function getAuthCredentialsForLogin(loginCredentials, options) {

	var promise = new Promise(
		function(resolve, reject) {
			//TODO: use projection exclude password and create-date					
			AuthCredentials.findOne({
					email: loginCredentials.email,
					password: loginCredentials.password
				},
				'_id role',
				function(err, credentials) {
					if (err) {
						reject(err);
					} else if (credentials) {
						resolve(credentials);
					} else {
						reject({
							message: 'Authentication Failed!!'
						});
					}
				});
		});
	return promise;
}

exports.getAuthCredentialsForLogin = getAuthCredentialsForLogin;