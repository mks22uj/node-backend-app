var _ = require('lodash');
var {
    ObjectID
} = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');
var {
    SchoolInfo
} = require('../sms-models/SchoolInfo');
var {
    mongoose
} = require('../db/mongoose');
var formidable = require('express-formidable');
var router = express.Router();
//router.use(bodyParser.json()); it is used to post data using json format
router.use(formidable());
router.post('/addSchool', (req, res) => {
    console.log(req.fields);
    var schoolData = new SchoolInfo(req.fields);
    // var schoolData = new SchoolInfo({
    //     schoolName: req.body.schoolName,
    //     schoolAddress: req.body.schoolAddress,
    //     schoolStateId: req.body.schoolStateId,
    //     schoolCityId: req.body.schoolCityId,
    //     ownerName: req.body.ownerName,
    //     regNum: req.body.regNum,
    //     bannerFile: req.body.bannerFile,
    //     establishmentYear: req.body.establishmentYear,
    //     schoolBoardId: req.body.schoolBoardId,
    //     schoolMediumId: req.body.schoolMediumId,
    //     logoFile: req.body.logoFile,
    //     classLower: req.body.classLower,
    //     classUpper: req.body.classUpper,
    //     maxNumStudents: req.body.maxNumStudents
    // });
    schoolData.save().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.send(err);
    });
});
router.get('/getSchools', (req, res) => {
    console.log(req.body);
    SchoolInfo.find({}).then((doc) => {
        res.send(doc);
    }).catch((e) => {
        res.send(e);
    });
});
router.get('/getSchoolInfo/:id', (req, res) => {
    var id = req.params.id;
    if (ObjectID.isValid(id)) {
        SchoolInfo.findById(id).then((doc) => {
            if (!doc) {
                return res.status(404).send();
            }
            res.send(doc);
        }).catch((err) => {
            res.status(404).send();
        });
    }

});
router.patch('/updateSchoolInfo/:id', (req, res) => {
    var id = req.params.id;
    if (ObjectID.isValid(id)) {
        var body = _.pick(req.body, ["regNum", "establishmentYear"]);
        body.regNum = "1234";
        body.establishmentYear = "2018-19";
        SchoolInfo.findByIdAndUpdate(id, {
            $set: body
        }, {
            new: true
        }).then((doc) => {
            if (!doc) {
                res.status(404).send();
            }
            res.send(doc);
        }).catch((err) => {
            res.status(404).send();
        })
    }
});
//router.use(bodyParser.json()); it is used to update data as json format
router.use(formidable());
router.patch('/updateSchool', (req, res) => {
    var schoolData = new SchoolInfo(req.fields);
    SchoolInfo.update({
        '_id': req.fields._id
    }, schoolData, {
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
router.delete('/deleteSingleSchool/:id', (req, res) => {
    var id = req.params.id;
    if (ObjectID.isValid(id)) {
        SchoolInfo.findByIdAndRemove(id).then((doc) => {
            if (!doc) {
                return res.status(404).send();
            }
            res.send(doc);
        }).catch((err) => {
            res.status(404).send();
        });
    }
});
router.delete('/deleteAllSchools', (req, res) => {
    SchoolInfo.remove({}).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(401).send();
    });
});
module.exports = router;
// app.listen(3001);
// console.log("listening at http://localhost:3000");