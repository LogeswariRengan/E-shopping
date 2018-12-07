//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var StatusSchema = new Schema({
  userId :String,
  productId : String,
  status : String,
  productQuantity : Number


});
module.exports = mongoose.model("status",StatusSchema);