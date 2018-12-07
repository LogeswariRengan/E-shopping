const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
require("../models/users.js");
var constants = require("../constants/constants.js")
var userModel;
var UserModel = mongoose.model("users");

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config.js');
var token;
var isCheck = false;

console.log("usercontroller");
//Register method

router.post('/register', (req, res) => {
    console.log(req.body);
    UserModel.findOne({ email: req.body.email }, (err, data) => {
        if (null == data) {

            userModel = new UserModel(req.body);
            //todo  userrole has to be set by either admin or end user (end user doesnt have choice)
            userModel.userRole = "seller";
            userModel.save().then(response => {
                res.json(registerSucess);
            });
        }
        else {
            res.json(alreadyAccount);
        }
    });

});

// login method
router.post('/login', (req, res) => {
    console.log("login");
    UserModel.findOne({ email: req.body.email }, (err, data) => {
        if (null != data) {
            if (null != data.email) {
                if (req.body.password == data.password) {
                    var encryptedPassword = bcrypt.hashSync(data.password, 8);
                    // var token = jwt.sign({
                    //     email: data.email, userName: data.userName, phoneNumber: data.phoneNumber, userRole: data.userRole
                    // }, config.secret, {
                    //         expiresIn: 2300


                    //     }, { alg: 'RS384' });
                    token = getToken(data);
                    res.send({ status: loginSuccess, token: token });
                    // res.json(loginSuccess);

                }
                else {
                    res.json(passwordIncorrect);
                }
            }
        }
        else {
            res.json(emailIncorrect);
        }
    });
});

// forgot password
router.post('/forgotpassword', (req, res) => {
    UserModel.findOne({ email: req.body.email }, (err, data) => {
        if (null != data) {

            console.log(data);
            res.json(data);

        }
        else {
            console.log("not correct");
            res.json(emailIncorrect);
        }
    });
});

//reset password
router.put('/resetpassword', (req, res) => {
    console.log(req.body)
    UserModel.findOneAndUpdate({ email: req.body.email }, req.body, () => {
        console.log(req.body.email);
        res.json(passwordResetted);
    });
});


//updateEmail
router.put('/updateEmail', (req, res) => {
    console.log("hai")
    console.log("request", req.body);
    UserModel.findByIdAndUpdate(req.body.id, { $set: { email: req.body.email } }, { new: true }, (error, data) => {
        token = getToken(data);
        if (token) {
            res.send({ status: emailUpdated, updatedToken: token });
        }
    })

});


//updatePhoneNumber
router.put("/updatePhone", (req, res) => {
    UserModel.findByIdAndUpdate(req.body.id, { $set: { phoneNumber: req.body.phoneNumber } }, { new: true }, (error, data) => {
        token = getToken(data);
        if (token) {
            res.send({ status: phoneUpdated, updatedToken: token });
        }
    })
})


//updateName
router.put('/updateName', (req, res) => {

    UserModel.findByIdAndUpdate(req.body.id, { $set: { userName: req.body.userName } }, { new: true }, (error, data) => {
        token = getToken(data);
        if (token) {
            res.send({ status: nameUpdated, updatedToken: token });
        }
    })

});

//password check
router.post('/checkPassword', (req, res) => {
    UserModel.findById(req.body.id, (error, data) => {
     
        if (data.password === req.body.password) {
            isCheck = true;
        }

        res.send(isCheck);

    })
})

//updatePassword
router.put('/updatePassword', (req, res) => {
    console.log("sdgdsfg")
    console.log(req.body)
    UserModel.findByIdAndUpdate(req.body.id, { $set: { password: req.body.password } }, { new: true }, (error, data) => {
        if (data) {
            console.log(data)
            res.send({status :passwordUpdated});
        }
    })
})

//token generation
function getToken(data) {
   
    token = jwt.sign({
        userId: data._id, email: data.email, userName: data.userName, phoneNumber: data.phoneNumber, userRole: data.userRole
    }, config.secret, {
            expiresIn: 2300


        }, { alg: 'RS384' });

    return token;
}

module.exports = router;


