var {
    mongoose
} = require('mongoose');
var express = require('express');
var formidable = require('express-formidable');
var {
    ObjectID
} = require('mongodb');
var {
    subjectInfo
} = require('../sms-models/BoardSubjectInfo');
var router = express.Router();
router.use(formidable());
router.post('/addSubject', (req, res) => {
    var subjectData = new subjectInfo(req.fields);
    subjectData.save().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get("/getSubjectList", (req, res) => {
    subjectInfo.find().then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/getBoardSubject/:board_id', (req, res) => {
    var id = req.params.board_id;
    subjectInfo.find({
        'board_id': id
    }).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.delete('/removeSubject/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    subjectInfo.findByIdAndRemove(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        return res.status(404).send();
    });
});
router.patch('/updateSubject', (req, res) => {
    var updateData = new subjectInfo(req.fields);
    subjectInfo.update({
        "_id": req.fields._id
    }, updateData, {
        new: true
    }).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        return res.status(404).send();
    });
});
module.exports = router;