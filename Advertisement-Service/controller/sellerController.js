var advertisementStore = require('../DAL/store/sellerStore.js');

function cretaeAd(accountId, advertisementRequestOb, options) {

	var promise = new Promise(
		function(resolve, reject) {
			function successCreate(advertisement) {
				resolve(advertisement);
			}

			function errorCreate(err) {
				reject(err);
			}
			advertisementStore.createAd(accountId, advertisementRequestOb, options).then(successCreate, errorCreate);
		});
	return promise;
}

function getAdsForAccount(accountId, options) {
	var promise = new Promise(
		function(resolve, reject) {
			function successGet(advertisementsList) {
				resolve(advertisementsList);
			}

			function errorGet(err) {
				reject(err);
			}
			advertisementStore.getAdsForAccount(accountId, options).then(successGet, errorGet);
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
			advertisementStore.getAdById(id, options).then(successGet, errorGet);
		});
	return promise;
}

function deleteAd(id, options) {
	var promise = new Promise(
		function(resolve, reject) {
			function successDelete(result) {
				resolve(result);
			}

			function errorDelete(err) {
				reject(err);
			}
			advertisementStore.deleteAd(id, options).then(successGet, errorGet);
		});
	return promise;
}

function updateAd(id, updateParamsOb, options) {
	var promise = new Promise(
		function(resolve, reject) {
			function successUpdate(updatedAd) {
				resolve(updatedAd);
			}

			function errorUpdate(err) {
				reject(err);
			}
			advertisementStore.updateAd(id, updateParamsOb, options).then(successUpdate, errorUpdate);
		});
	return promise;
}

exports.createAd = cretaeAd;
exports.getAdsForAccount = getAdsForAccount;
exports.getAdById = getAdById;
exports.deleteAd = deleteAd;
exports.updateAd = updateAd;