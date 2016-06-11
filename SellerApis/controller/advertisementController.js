var advertisementStore = require('../DAL/store/advertisementStore.js');

function cretaeAd(accountId, advertisementRequestOb, options) {
	
	var promise = new Promise(
		function(resolve, reject) {
			function successCreate(advertisement){
             resolve(advertisement);
	        }
	        function errorCreate(err){
             reject(err);
            }
        advertisementStore.createAd(accountId,advertisementRequestOb,options).then(successCreate,errorCreate);        	
		});
	return promise;
}

exports.createAd = cretaeAd;