var mongoose =require('mongoose');
var Schema =mongoose.Schema;
var authCredentialsSchema =new  Schema({
    email: String,
    password: String,
    role : String,
    create_date : {type:Date, default:Date.now}
});

module.exports= mongoose.model('auth_credential', authCredentialsSchema);