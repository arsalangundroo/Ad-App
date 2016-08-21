var mongoose =require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema =mongoose.Schema;
var authCredentialsSchema =new  Schema({
    email: String,
    password: String,
    accountId : Schema.ObjectId,
    Role : String,
    create_date : {type:Date, default:Date.now}
});
authCredentialsSchema.plugin(mongoosePaginate);

module.exports= mongoose.model('AuthCredential', authCredentialsSchema);