var mongoose =require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema =mongoose.Schema;
var advertisementSchema =new  Schema({
	accountId : Schema.ObjectId,   // Check for correct type of objectId.
	item_name : String,
    deal: {type: String, default: 'No_Deal'},
    discount :{type: String,default: '0%'},
  //  available_quantity: Number,
    create_date : {type:Date, default:Date.now},
    image_url: String
});
advertisementSchema.plugin(mongoosePaginate);

module.exports= mongoose.model('Advertisement', advertisementSchema);