var mongoose =require('mongoose');
var Schema =mongoose.Schema;
var advertisementSchema =new  Schema({
	item_name : String,
    deal: String,
    discount :{type: Number, index: true,default: 0},
    available_quantity: Number,
    date : {type:Date, default:Date.now},
    shopkeeperId : Schema.ObjectId,   // Check for correct type of objectId.
    image_url: String
}) 

mongoose.model('Advertisement', advertisementSchema);