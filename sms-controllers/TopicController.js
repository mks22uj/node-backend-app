var mongoose = require('mongoose');
var {
    ObjectID
} = require('mongodb');
var {
    TopicInfo
} = require('../sms-models/TopicInfo');
var express = require('express');
var formidable = require('express-formidable');
var router = express.Router();
router.use(formidable());
router.post('/addTopic', (req, res) => {
    console.log(req.fields);
    var topicData = new TopicInfo(req.fields);
    topicData.save().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/getTopicList', (req, res) => {
    TopicInfo.find().then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.put('/updateTopicInfo', (req, res) => {
    console.log(req.fields);
    var updateData = new TopicInfo(req.fields);
    TopicInfo.update({
        _id: req.fields._id
    }, updateData).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/getTopicInfo/:id', (req, res) => {
    console.log(req.body);
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    TopicInfo.findById(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.delete('/deleteTopicInfo/:id', (req, res) => {
    console.log(req.body);
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    TopicInfo.findByIdAndRemove(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});


module.exports = router;