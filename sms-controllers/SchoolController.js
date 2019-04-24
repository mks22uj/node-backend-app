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
var router = express.Router();
router.use(bodyParser.json());
router.post('/addSchool', (req, res) => {
    console.log(req.body);

    var schoolData = new SchoolInfo({
        schoolName: req.body.schoolName,
        schoolAddress: req.body.schoolAddress,
        schoolStateId: req.body.schoolStateId,
        schoolCityId: req.body.schoolCityId,
        ownerName: req.body.ownerName,
        regNum: req.body.regNum,
        bannerFile: req.body.bannerFile,
        establishmentYear: req.body.establishmentYear,
        schoolBoardId: req.body.schoolBoardId,
        schoolMediumId: req.body.schoolMediumId,
        logoFile: req.body.logoFile,
        classLower: req.body.classLower,
        classUpper: req.body.classUpper,
        maxNumStudents: req.body.maxNumStudents
    });
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
router.get('/getSingleSchoolInfo/:id', (req, res) => {
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
router.patch('/updateSingleSchool/:id', (req, res) => {
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
router.use(bodyParser.json());
router.patch('/updateSchool', (req, res) => {
    var schoolData = new SchoolInfo(req.body);
    SchoolInfo.updateOne({
        '_id': req.body._id
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