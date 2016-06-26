var Advertisement = require('../models/advertisements.js');

function createAd(accountId, advertisementRequestOb, options) {
	advertisementDBObject = getAdvertisementDBOb(accountId, advertisementRequestOb);
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

function getAdsForAccount(accountId, options) {
	var pageNumber = 1;
	var pageSize = 10;

	if (options && options.psize) {
		pageSize = options.psize;
	}
	if (options && options.pnum) {
		pageNumber = options.pnum;
	}
	var promise = new Promise(
		function(resolve, reject) {
			Advertisement.paginate({
				accountId: accountId
			}, {
				page: pageNumber,
				limit: pageSize
			}, function(err, result) {
				if (err) {
					reject(err);
				} else {
					var responseOb = {};
					responseOb.ads = result.docs;
					responseOb.paging = {
						pageNumber: result.page,
						pageSize: result.limit,
						totalPages: result.pages
					};
					resolve(responseOb);
				}
			});
		});
	return promise;
}

function getAdById(id, options) {
	var promise = new Promise(
		function(resolve, reject) {
			Advertisement.findById(id, function(err, advertisement) {
				if (err) {
					reject(err);
				} else {
					if (advertisement === null) {
						var error = {};
						error.error_message = "No advertisement found for the provided Id";
						reject(error);
					} else {
						resolve(advertisement);
					}
				}
			});
		});
	return promise;
}

function deleteAd(advertisementId, options) {
	var promise = new Promise(
		function(resolve, reject) {
			Advertisement.remove({
				_id: advertisementId
			}, function(err) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	return promise;
}

function updateAd(advertisementId, updateParamsOb, options) {
	var query = {
		_id: advertisementId
	};
	var options = {
		new: true
	};
	var promise = new Promise(
		function(resolve, reject) {
			Advertisement.findByIdAndUpdate(advertisementId, updateParamsOb, options,
				function(err, updatedAd) {
					if (err) {
						reject(err);
					} else {
						if (updatedAd === null) {
							var error = {};
							error.error_message = "No advertisement found for the provided Id";
							reject(error);
						} else {
							resolve(updatedAd);
						}
					}
				});
		});
	return promise;
}

function getAdvertisementDBOb(accountId, advertisementRequestOb) {
	var advertisement = new Advertisement();
	try {
		advertisement.accountId = accountId;
		advertisement.item_name = advertisementRequestOb.item_name;
		advertisement.description = advertisementRequestOb.description;
		advertisement.price = advertisementRequestOb.price;
		advertisement.deal = advertisementRequestOb.deal;
		advertisement.discount = advertisementRequestOb.discount;
		advertisement.create_date = new Date();
		//TODO: get the image uri base path from configuration
		advertisement.image_url = '/home/arsalan/Desktop/Ads-Images/' + accountId + '\/' + advertisement.item_name + '-' + advertisement.create_date;
	    if(advertisementRequestOb.is_available!==null && advertisementRequestOb.is_available!==undefined){
	    	advertisement.is_available = advertisementRequestOb.is_available;
	    }
	} catch (error) {
		console.log(error);
	}
	return advertisement;
}

// function modifyAd(advertisement,updateParams){
// 	console.log(updateParams);
// 	if(updateParams.item_name){
// 		advertisement.item_name=updateParams.item_name;
// 	}
// 	if(updateParams.price){
// 		advertisement.price=updateParams.price;
// 	}
// 	if(updateParams.deal){
//         advertisement.deal = updateParams.deal;
// 	}
// 	if(updateParams.discount){
// 		advertisement.discount =updateParams.discount;
// 	}
// 	//console.log(advertisement);
// 	return advertisement;
// }

exports.createAd = createAd;
exports.getAdsForAccount = getAdsForAccount;
exports.getAdById = getAdById;
exports.deleteAd = deleteAd;
exports.updateAd = updateAd;