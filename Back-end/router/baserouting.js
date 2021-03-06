


const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const userController = require("../controllers/user-controller.js");
const productController= require("../controllers/product-controller.js");
const statusController = require('../controllers/status-controller.js');
const app= express();

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config.js');

// Connect

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/E-Shopping').then(()=>
console.log("con"))
.catch(err=>console.log(err));

//routing
 
  app.use('/users',userController);
  app.use('/products',productController); 
  app.use('/status',statusController);
  module.exports = app;