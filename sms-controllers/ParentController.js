var {
    mongoose
} = require('../db/mongoose');
var {
    parentInfo
} = require('../sms-models/ParentInfo');
var {
    ObjectID
} = require('mongodb');
var express = require('express');
const formidable = require('express-formidable');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(formidable());
router.post('/addParent', (req, res) => {
    console.log(req.fields);
    var parentdate = new parentInfo(req.fields);
    parentdate.save().then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/getParentList', (req, res) => {
    console.log(req.body);
    parentInfo.find({}).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/getParentinfo/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    parentInfo.findById(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.use(formidable());
router.put('/updateParentInfo', (req, res) => {
    console.log(req.fields);
    var parentData = new parentInfo(req.fields);
    parentInfo.update({
        _id: req.fields._id
    }, parentData).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.delete('/deleteParentInfo/:id', (req, res) => {
    console.log(req.body);
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    parentInfo.findByIdAndRemove(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
module.exports = router;