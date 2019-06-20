var {
    mongoose
} = require('mongoose');
var {
    ObjectID
} = require('mongodb');
var express = require('express');
var formidable = require('express-formidable');
var {
    class_subjectInfo
} = require('../sms-models/ClassSubjectInfo');
var router = express.Router();
router.use(formidable());
router.post('/addSubject', (req, res) => {
    console.log(req.fields);
    var classSubjectData = new class_subjectInfo(req.fields);
    classSubjectData.save().then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/getAll/class/subject/list', (req, res) => {
    class_subjectInfo.find().then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.patch('/update-class-subject', (req, res) => {
    var updateData = new class_subjectInfo(req.fields);
    class_subjectInfo.updateOne({
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
router.get('/getClassSubjectInfo/:class_id', function (req, res) {
    var class_id = req.params.class_id;
    class_subjectInfo.find({
        "classId": class_id
    }).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.delete('/delete_class_subject/:class_map_id', (req, res) => {
    var class_map_id = req.params.class_map_id;
    class_subjectInfo.findByIdAndRemove(class_map_id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/get/staff/routine/:staff_id', (req, res) => {
    var satff_id = req.params.satff_id;
    class_subjectInfo.find({
        "teacherId": satff_id
    }).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {});
});

module.exports = router;