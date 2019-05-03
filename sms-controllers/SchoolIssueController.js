var mongoose = require('../db/mongoose');
var {
    ObjectID
} = require('mongodb');
var express = require('express');
var formidable = require('express-formidable');
var {
    SchoolIssueInfo
} = require('../sms-models/SchoolIssue');
var router = express.Router();
router.use(formidable());
router.post('/postSchoolIssue', (req, res) => {
    console.log(req.fields);
    var issueData = new SchoolIssueInfo(req.fields);
    issueData.save().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/getSchoolIssueInfo', (req, res) => {
    SchoolIssueInfo.find().then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/getSchoolIssueInfo/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    SchoolIssueInfo.findById(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.put('/updateSchoolIssue', (req, res) => {
    console.log(req.fields);
    var issueData = new SchoolIssueInfo(req.fields);
    SchoolIssueInfo.update({
        _id: req.fields._id
    }, issueData).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.delete('/deleteSchoolIssueInfo/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    SchoolIssueInfo.findByIdAndRemove(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
module.exports = router;