var customerStore = require('../DAL/store/customerStore.js');

function getAdsFromSeller(sellerId, options) {
	var promise = new Promise(
		function(resolve, reject) {
			function successGet(advertisementsList) {
				resolve(advertisementsList);
			}

			function errorGet(err) {
				reject(err);
			}
			customerStore.getAdsFromSeller(sellerId, options).then(successGet, errorGet);
		});
	return promise;
}

function getAdById(id, options) {
	var promise = new Promise(
		function(resolve, reject) {
			function successGet(advertisement) {
				resolve(advertisement);
			}

			function errorGet(err) {
				reject(err);
			}
			customerStore.getAdById(id, options).then(successGet, errorGet);
		});
	return promise;
}

exports.getAdsFromSeller = getAdsFromSeller;
exports.getAdById = getAdById;
