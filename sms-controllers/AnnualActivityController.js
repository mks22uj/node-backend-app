var mongoose = require('../db/mongoose');
var {
    AnnualActivity
} = require('../sms-models/AnnualActivityInfo');
var express = require('express');
var formidable = require('express-formidable');
var {
    ObjectID
} = require('mongodb');
var router = express.Router();
router.use(formidable());
router.post('/add_activity', (req, res) => {
    console.log(req.fields);
    var activityData = new AnnualActivity(req.fields);
    activityData.save().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/getActivity', (req, res) => {
    AnnualActivity.find().then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/getActivity/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    AnnualActivity.findById(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.put('/updateActivity', (req, res) => {
    var updateData = new AnnualActivity(req.fields);
    AnnualActivity.updateOne({
        "_id": req.fields._id
    }, updateData, {
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
router.delete('/deleteActivity/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    AnnualActivity.findByIdAndRemove(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
module.exports = router;