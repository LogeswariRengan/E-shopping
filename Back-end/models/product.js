//Require Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Define a schema


var productSchema = new Schema({
    productId: {
        type: String
    },
    productName: {
        type: String
    },
    productType: {
        type: String
    },
    productPrice: {
        type: Number
    },
    productSeller: String,
    productPerUser: String,
    productRating: Number,
    productOffer: Number,
    productOfferedPrice: Number,
    productDesc: String,
    productColor: String,
    productAvailabilty: Number,
    productIdealFor: String,
    bagBrand: String,
    bagMaterial: String,
    bagTheme: String,
    bagCapacity: Number,
    watchBrand: String,
    watchMaterial: String,
    watchFeature: String,
    watchType: String,
    shoeBrand: String,
    shoeMaterial: String,
    shoeType: String,
    productImage: String,
    frontView: String,
    topView: String,
    backView: String,
    bottomView: String,
    leftView: String,
    rightView: String,

});

module.exports = mongoose.model("product", productSchema);
