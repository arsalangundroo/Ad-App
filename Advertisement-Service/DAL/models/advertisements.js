var mongoose =require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema =mongoose.Schema;
var advertisementSchema =new  Schema({
	accountId : Schema.ObjectId,   // Check for correct type of objectId.
	item_name : String,
	description : String,
	price : Number,
	//currency : String,
    deal: {type: String, default: 'No_Deal'},
    discount :{type: Number,default: 0},
    create_date : {type:Date, default:Date.now},
    image_url: String,
    is_available: {type: Boolean , default: true}
});
advertisementSchema.plugin(mongoosePaginate);

module.exports= mongoose.model('Advertisement', advertisementSchema);