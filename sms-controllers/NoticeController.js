var mongoose = require('../db/mongoose');
var {
    ObjectID
} = require('mongodb');
var {
    NoticeInfo
} = require('../sms-models/NoticeInfo');
var express = require('express');
var formidable = require('express-formidable');
var router = express.Router();
router.use(formidable());
router.post('/postNoticeInfo', (req, res) => {
    var postNoticeData = new NoticeInfo(req.fields);
    postNoticeData.save().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/getNoticeInfo', (req, res) => {
    console.log(req.fields);
    NoticeInfo.find().then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/getNoticeInfo/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(403).send();
    }
    NoticeInfo.findById(id).then((doc) => {
        if (!doc) {
            return res.status(405).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(402).send();
    });
});
router.put('/updateNoticeInfo', (req, res) => {
    console.log(req.fields);
    var noticeData = new NoticeInfo(req.fields);
    NoticeInfo.update({
        _id: req.fields._id
    }, noticeData).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.delete('/deleteNoticeInfo/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    NoticeInfo.findByIdAndRemove(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    })
});
router.delete('/deleteAllNoticeInfo', (req, res) => {
    console.log(req.fields);
    NoticeInfo.remove({}).then((doc) => {
        if (!doc) {
            return res.status(405).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.send("Unabale To delete Notice");
    });
});
module.exports = router;