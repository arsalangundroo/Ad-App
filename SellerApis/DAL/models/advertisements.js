var mongoose =require('mongoose');
var Schema =mongoose.Schema;
var advertisementSchema =new  Schema({
	accountId : Schema.ObjectId,   // Check for correct type of objectId.
	item_name : String,
    deal: String,
    discount :{type: Number, index: true,default: 0},
    available_quantity: Number,
    date : {type:Date, default:Date.now},
    //image_url: String
}) 

module.exports= mongoose.model('Advertisement', advertisementSchema);