var AuthCredentials = require('../models/authCredentials.js');
var ObjectId = (require('mongoose').Types.ObjectId);

function getAuthCredentialsForLogin(loginCredentials, options) {

	var promise = new Promise(
		function(resolve, reject) {
			//TODO: use projection exclude password and create-date					
			AuthCredentials.findOne({
					email: loginCredentials.email,
					password: loginCredentials.password
				},
				'_id  email role',
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

function checkTokenCredentialsInDB(tokenCredentials, options) {
	var promise = new Promise(
		function(resolve, reject) {
			//TODO: use projection exclude password and create-date					
			AuthCredentials.findOne({
					_id: new ObjectId(tokenCredentials._id),
					email : tokenCredentials.email,
					role : tokenCredentials.role
				},
				function(err, credentials) {
					if (err) {
						reject(err);
					} else if (credentials) {
						resolve({accountId:credentials._id, valid:true});
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
exports.checkTokenCredentialsInDB = checkTokenCredentialsInDB;