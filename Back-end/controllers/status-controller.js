const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');

// var blueBird = require('bluebird');

var constants = require("../constants/constants.js");
require('../models/status.js');

var StatusModel = mongoose.model('status');
var ProductModel = mongoose.model('product');


console.log("status controller");

//to add status of product
router.post("/addProductToCart", (req, res) => {
    console.log(req.body)
    status = new StatusModel(req.body);

    StatusModel.aggregate(
        [
            { $match: { $and: [{ productId: req.body.productId }, { userId: req.body.userId }] } }
        ]
    ).exec((error, response) => {
        console.log("resposne", response)


        if (!response[0]) {

            console.log("empty")
            status.save().then(
                (data) => {
                    console.log("saved", data);
                    console.log(data._id)
                    StatusModel.updateOne({ _id: data._id }, { $set: { productQuantity: 1 } }).then(
                        (updatedData) => {
                            console.log("updated data ", updatedData)
                        })
                    res.json(addedToCartStatus);
                }
            )
        }
        else {
            console.log("not empty")
            StatusModel.updateOne({ _id: response[0]["_id"] }, { $inc: { productQuantity: 1 } }).then(
                (updatedData) => {
                    console.log("updated data ", updatedData)
                })
            res.json(addedToCartStatus);
        }
    })

});

//update product quantity
router.post("/updateProductQuantity", (req, res) => {
    console.log("request", req.body)
    console.log("quant", req.body.productQuantity)

    StatusModel.find({ userId: req.body.userId, productId: req.body.productId }).then((data) => {
        console.log("###########", data)
        var id = data[0]._id;
     
        StatusModel.findByIdAndUpdate(id, {
            $set: { productQuantity: req.body.productQuantity }
        }).then((updateddata) => {
            console.log("^^^^^^^^^^^^^", updateddata)
        })
    })
res.json("updatedquantoty")
})


//fetch products in cart
router.post("/fetchCartProducts", (req, res) => {
    console.log("userId", req.body)

    const ObjectId = mongoose.Types.ObjectId;
    var id = "";
    var productQuantity;
    var cartProduct = [];
    var cartProducts = [];
    // StatusModel.aggregate([
    //     { $match: { $and: [{ userId: req.body.userId }, { status: "Cart" }] } }
    // ]).exec((error, response) => {
    //     console.log("response ", response)
    //     response.aggregate([
    //         {
    //             $lookup:{
    //                 from : "products",
    //                 localField : "productId",
    //             foreignField : "_id",
    //              as : "cartProducts"
    //             }
    //         }
    //     ]).exec((data)=>{console.log(data)})     

    // })



    StatusModel.aggregate([
        { $match: { $and: [{ userId: req.body.userId }, { status: 'Cart' }] } }
    ]).then(function (items) {
        for (i = 0; i < items.length; i++) {
            console.log("items", items[i]["productId"]);
            id = items[i]["productId"];
            productQuantity = items[i]["productQuantity"]
            // cartProduct.push(ProductModel.findById(id).select("productName productPrice"))
            cartProduct.push(ProductModel.aggregate([
                { $match: { _id: ObjectId(id) } },
                { $project: { productName: 1, productSeller: 1, productPerUser: 1, productImage: 1, productPrice: 1, productOffer: 1, productOfferedPrice: 1, productAvailabilty: 1, productName: 1, quantity: { $add: productQuantity } } }
            ]))

        }

        return Promise.all(cartProduct);
    }).then((products) => {
        // var result = new Array();
        // for(let i = 0; i< products.length ; i ++ ) {
        //     result.push({
        //         item: items[i].productQuantity,
        //         product: products[i]
        //     }

        //     );
        // }
        console.log("products", products)
        res.send(products)
    }).catch((error) => {
        console.log(error)
    })


    // StatusModel.find({ userId: req.body.userId }).map(function (list) {

    //         return list.productId;
    //     });
    // console.log("productIds", productIds)
    // var cartProducts = ProductModel.findById({ _id: { $in: productIds } }).then((error, response) => {
    //     console.log("responseeeeeeee", response)
    // });
    // console.log("products in cart", cartProducts)



})

module.exports = router;