var mongoose = require('../db/mongoose');
var express = require('express');
var formidable = require('express-formidable');
var {
    ObjectID
} = require('mongodb');
var {
    TestInfo
} = require('../sms-models/TestInfo');
var router = express.Router();
router.use(formidable());
router.post('/addTestInfo', (req, res) => {
    console.log(req.fields);
    var testData = new TestInfo(req.fields);
    testData.save().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });

});
router.get('/getTestInfo', (req, res) => {
    console.log(req.body);
    TestInfo.find().then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/getTestInfo/:id', (req, res) => {
    console.log(req.body);
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    TestInfo.findById(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.use(formidable());
router.put('/updateTestInfo', (req, res) => {
    console.log(req.fields);
    var testData = new TestInfo(req.fields);
    TestInfo.update({
        _id: req.fields._id
    }, testData).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.delete('/deleteTestInfo/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    TestInfo.findByIdAndRemove(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
module.exports = router;