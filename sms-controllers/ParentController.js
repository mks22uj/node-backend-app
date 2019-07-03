var mongoose = require("../db/mongoose");
var express = require("express");
const _ = require("lodash");
const bcryptjs = require('bcryptjs');
const {
    SHA256
} = require('crypto-js');
const jwt = require("jsonwebtoken");
var formidable = require("express-formidable");
var {
    ParentInfo
} = require("../sms-models/ParentInfo");
var {
    ObjectID
} = require('mongodb');
var router = express.Router();
router.use(formidable());
router.post("/parent/api/register", (req, res) => {
    var parentData = new ParentInfo(req.fields);
    parentData.save().then((parentData) => {
        return parentData.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send({
            "error": false,
            "errorCode": null,
            "Message": "Error is not Available",
            "response": parentData
        });
    }).catch((err) => {
        return res.status(404).send({
            "error": false,
            "errorCode": "err28019",
            "Message": "Invalid Fields",
            "response": parentData
        });
    });
});
router.get('/get/info/byToken', (req, res) => {
    var token = req.header('x-auth');
    ParentInfo.findByToken(token).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    });
});
//Login Api With Respect to Existing Tokens Section Starts 
router.use(formidable());
router.post("/parent/login", (req, res) => {
    //console.log("req.body  " + req.fields);
    var body = _.pick(req.fields, ["userName", "password"]);
    console.log(body.userName + "    " + body.password);
    ParentInfo.findByCredentials(body.userName, body.password).then((user) => {
        res.send({
            "error": false,
            "errorCode": null,
            "Message": null,
            "response": user
        });
    }).catch((err) => {
        res.status(404).send({
            "error": false,
            "errorCode": "err3456",
            "Message": "invalid username/password",
            "response": null
        });
    });
});
//Login Api With Respect to Existing Tokens Section Ends
//Creating Login API which is used to generate token at the time of login Section Starts
router.use(formidable())
router.post("/parent/login/with/token", (req, res) => {
    var body = _.pick(req.fields, "userName", "password");
    ParentInfo.findByCredentials(body.userName, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send({
                "error": false,
                "errorCode": null,
                "errorMessage": null,
                "response": user
            });
        }).catch((err) => {
            res.status(404).send({
                "error": false,
                "errorCode": "tokenerror2345",
                "errorMessage": "Token Does not Exist"
            });
        });
    });
});
//Creating Login API which is used to generate token at the time of login Section End
//Get All Parent List Form Mongodb Database Section Starts
router.get("/get/parent/list/all", (req, res) => {
    console.log(req.fields);
    ParentInfo.find().then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send({
            "error": false,
            "errorCode": null,
            "errorMessage": null,
            "response": doc
        });
    }).catch((err) => {
        res.status(404).send({
            "error": true,
            "errorCode": "error33ed",
            "errorMessage": "invalid parent info url"
        });
    });
});
//Get All Parent List Form Mongodb Database Section Starts

//Get Single Parent Information According To Parent_Id Section Starts
router.get("/get/parent/info/:id", (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({
            "error": true,
            "errorCode": "e32rror",
            "errorMessage": "parent id does not exist"
        });
    }
    ParentInfo.findById(id).then((doc) => {
        if (!doc) {
            return res.status(404).send({
                "error": true,
                "errorCode": "e32rror",
                "errorMessage": "unable to find info with id"
            });
        }
        res.send({
            "error": false,
            "errorCode": null,
            "errorMessage": null,
            "response": doc
        });
    }).catch((err) => {
        res.status(404).send();
    });
});
//Get Single Parent Information According To Parent_Id Section Ends

//Update Parent Information According To Parent_Id Section Starts
router.use(formidable());
router.patch('/update/parent/info', (req, res) => {
    console.log(req.fields);
    var parentData = new ParentInfo(req.fields);
    ParentInfo.updateOne({
        "_id": req.fields._id
    }, parentData, {
        new: true
    }).then((doc) => {
        if (!doc) {
            return res.status(400).send({
                "error": true,
                "errorCode": "err2346or",
                "errorMessage": "id does not exist"
            });
        }
        res.status(200).send({
            "error": false,
            "errorCode": null,
            "errorMessage": null,
            "response": parentData
        });
    }).catch((err) => {
        res.status(405).send({
            "error": true,
            "errorCode": "err2345or",
            "errorMessage": "Unable to update parent info",
            "response": doc
        });
    });
});

//Update Parent Information According To Parent_Id Section End
router.delete('/delete/parent/info/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({
            "error": true,
            "errorCode": "errm15",
            "errorMessage": "id does not exist"
        });
    }
    ParentInfo.findOneAndDelete(id).then((doc) => {
        if (!doc) {
            return res.status(404).send({
                "error": true,
                "errorCode": "errm14",
                "errorMessage": "Unable to delete records"
            });
        }
        res.send({
            "error": false,
            "errorCode": null,
            "errorMessage": null,
            "response": doc
        });
    }).catch((err) => {
        return res.status(404).send();
    });
});
var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    ParentInfo.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((err) => {
        res.status(404).send();
    });
};
router.delete("/parent/logout", authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send({
            "error": false,
            "errorCode": null,
            "response": "successfully logout"
        });
    }, () => {
        res.status(404).send({
            "error": true,
            "errorCode": "logour234",
            "response": "token does not exist"
        });
    });
});
module.exports = router;