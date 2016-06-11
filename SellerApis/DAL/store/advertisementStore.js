var Advertisement = require('../models/advertisements.js');

function createAd(accountId, advertisementRequestOb, options) {
	advertisementDBObject = getAdvertisementDBOb(accountId, advertisementRequestOb);
	var promise = new Promise(
		function(resolve, reject) {
			advertisementDBObject.save()
			.then(function successSave(savedAdvertisement) {
				resolve(savedAdvertisement);
			},
			function errorSave(err){
                reject(savedAdvertisement);
			});
		});
	return promise;
}

function getAdvertisementDBOb(accountId, advertisementRequestOb) {
	var advertisement = new Advertisement();
	advertisement.accountId = advertisementRequestOb.accountId;
	advertisement.item_name = advertisementRequestOb.item_name;
	advertisement.deal = advertisementRequestOb.deal;
	advertisement.discount = advertisementRequestOb.discount;
	advertisement.available_quantity = advertisementRequestOb.available_quantity;
	advertisement.date = advertisementRequestOb.date;
	//TODO: set image URI
	return advertisement;
}

exports.createAd = createAd;