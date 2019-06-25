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
    //console.log(req.fields);
    var parentData = new ParentInfo(req.fields);

    //Store  Parent Information Without Storing Token Value
    /*parentData.save().then((result) => {
        if (!result) {
            return res.status(404).send();
        }
        res.send(result);
    }).catch((err) => {
        res.status(404).send();
    });*/
    parentData.save().then((parentData) => {
        return parentData.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(parentData);
    }).catch((err) => {
        return res.status(404).send();
    });
});
router.get('/get/info/byToken', (req, res) => {
    var token = req.header('x-auth');
    //console.log("Token Value=====      " + token);
    var original_Password = "ashok22uj";
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(original_Password, salt, (err, hash) => {
            console.log(hash);
        });
    });
    var hashedValue = "$2a$10$O8I6f0NkxEWgp8dVV11HHuAjjoOE4Fapcd8iR9U2jnEMV4Xt0Jw2e1";
    bcryptjs.compare(original_Password, hashedValue, (req, res) => {
        console.log("Hash Response =" + res);
    });

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
        res.send(user);
    }).catch((err) => {
        res.status(404).send();
    });
});
//Login Api With Respect to Existing Tokens Section Ends

//Get All Parent List Form Mongodb Database Section Starts
router.get("/get/parent/list/all", (req, res) => {
    console.log(req.fields);
    ParentInfo.find().then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
//Get All Parent List Form Mongodb Database Section Starts

//Get Single Parent Information According To Parent_Id Section Starts
router.get("/get/parent/info/:id", (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    ParentInfo.findById(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
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
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});

//Update Parent Information According To Parent_Id Section End
router.delete('/delete/parent/info/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    ParentInfo.findOneAndDelete(id).then((doc) => {
        if (!doc) {
            return res.status(404).send("remove");
        }
        res.send(doc);
    }).catch((err) => {
        return res.status(404).send();
    });
});
module.exports = router;