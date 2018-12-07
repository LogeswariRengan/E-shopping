const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');

var constants = require("../constants/constants.js");

require('../models/product.js');
var ProductModel = mongoose.model("product");
var product;

console.log("productcontroller");

// to add product (seller only)
router.post('/addproduct', (req, res) => {

    product = new ProductModel(req.body);
    // to-do if product name doesnot comes fix by aggregation of required fields
    product.save().then(() => {
        res.json(newProductAdded);
    });
});

//to fetch all the products
router.get('/fetchproduct', (req, res) => {
    console.log("fetch");
    /** to-do check user and map with corresponding collection which contain users recent activity,
     based on that sort aggregate the product and list out. */

    ProductModel.find({}, (err, data) => {
        res.send(data);
    })
});


//to fetch requested product
router.post('/getProduct', (req, res) => {
    console.log("product Id", req.body.productId);
    ProductModel.findById(req.body.productId, (error, data) => {
        if (data != null) {

            res.send(data);

        }
        else {
            res.json(noDataFound)
        }
    })
})

//to fetch the search products
router.post('/fetchSearchedProduct', (req, res) => {

    console.log("sdgsdgsfdhgsfdh", req.body.productType)
    ProductModel.find({ productType: req.body.productType }, (error, data) => {
        if (data != null) {

            console.log('Data found');
            console.log(data);
            res.send(data);

        } else {
            console.log("No data found!");
            res.json(noDataFound);
        }
    });

})

//to delete one particular product (admin)
router.delete('/deleteproduct', (req, res) => {
    console.log(req.body.productId);
    ProductModel.findOneAndDelete({ productId: req.body.productId })
        .then(() => {
            res.send("deleted");
        });
});


module.exports = router;