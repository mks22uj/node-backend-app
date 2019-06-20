var mongoose = require('../db/mongoose');
var {
    HolidayInfo
} = require('../sms-models/AcademicHolidayInfo');
var {
    ObjectID
} = require('mongodb');
var express = require('express');
var formidable = require('express-formidable');
var router = express.Router();
router.use(formidable());
router.post('/add_academic_holiday', (req, res) => {
    console.log(req.fields);
    var holidayInfo = new HolidayInfo(req.fields);
    holidayInfo.save().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/get_academic_holiday', (req, res) => {
    HolidayInfo.find().then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/get_academic_holiday/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    HolidayInfo.findById(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.use(formidable());
router.put('/update_academic_holiday', (req, res) => {
    var holidayInfo = new HolidayInfo(req.fields);
    /*HolidayInfo.updateOne({
        "_id": req.fields._id
    }, holidayInfo, {
        new: true
    }).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });*/
    HolidayInfo.update({
        _id: req.fields_id
    }, holidayInfo).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.delete('/delete_academic_holiday/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    HolidayInfo.findByIdAndRemove(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
module.exports = router;