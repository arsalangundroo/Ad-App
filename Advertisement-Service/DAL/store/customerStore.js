var Advertisement = require('../models/advertisements.js');

function getAdsFromSeller(sellerId, options) {
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
			Advertisement.paginate({accountId:sellerId}, {
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

exports.getAdsFromSeller=getAdsFromSeller;
exports.getAdById=getAdById;