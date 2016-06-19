var Advertisement = require('../models/advertisements.js');

function createAd(accountId, advertisementRequestOb, options) {
	advertisementDBObject = getAdvertisementDBOb(accountId, advertisementRequestOb);
	console.log('before promise');
	var promise = new Promise(
		function(resolve, reject) {
			advertisementDBObject.save()
				.then(function successSave(savedAdvertisement) {
						resolve(savedAdvertisement);
					},
					function errorSave(err) {
						reject(err);
					});
		});
	return promise;
}

function getAdvertisementDBOb(accountId, advertisementRequestOb) {
	var advertisement = new Advertisement();
	try {
		advertisement.accountId = accountId;
		advertisement.item_name = advertisementRequestOb.item_name;
		advertisement.deal = advertisementRequestOb.deal;
		advertisement.discount = advertisementRequestOb.discount;
		//advertisement.available_quantity = advertisementRequestOb.available_quantity;
		advertisement.create_date = new Date();
		//TODO: get the image uri base path from configuration
		console.log('before setting image_url');
		advertisement.image_url = '/home/arsalan/Desktop/Ads-Images/' + accountId + '/' + item_name + '-' + advertisement.create_date;
		console.log('after setting image_url');
	} catch (Exception e) {
		console.log(e);
	}
	return advertisement;
}

exports.createAd = createAd;