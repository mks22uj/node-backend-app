var express = require('express');
var _ = require('lodash');
var bodyParser = require('body-parser');
var {
    ObjectId
} = require('mongodb');
var {
    mongoose
} = require('../qnabu-db/mongoose');
var {
    StaffInfo
} = require('../qnabu-models/SchoolStaffInfo');
var app = express();
app.use(bodyParser.json());
app.post('/addStaff', (req, res) => {
    console.log(req.body);
    var staffData = new StaffInfo({
        staffFirstName: req.body.staffFirstName,
        staffLastName: req.body.staffLastName,
        roleId: req.body.roleId,
        roleTitle: req.body.roleTitle,
        employeeId: req.body.employeeId,
        schoolId: req.body.schoolId,
        joiningDate: req.body.joiningDate,
        previousOrganization: req.body.previousOrganization,
        presentAddress: req.body.presentAddress,
        userName: req.body.userName,
        passKey: req.body.passKey,
        createdBy: req.body.createdBy,
        currentlyAssociated: req.body.currentlyAssociated,
        createTime: req.body.createTime,
        profilePhoto: req.body.profilePhoto,
        session: req.body.session,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        permanentAddress: req.body.permanentAddress,
        dob: req.body.dob,
        gendar: req.body.gendar,
        bloodGroup: req.body.bloodGroup,
        educationQualification: req.body.educationQualification,
        nationality: req.body.nationality,
        birthPlace: req.body.birthPlace,
        motherTounge: req.body.motherTounge,
        fatherName: req.body.fatherName,
        motherName: req.body.motherName,
        religion: req.body.religion,
        cast: req.body.cast,
        adhar: req.body.cast,
        classSectionInfo: req.body.classSectionInfo
    });
    staffData.save().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
app.get('/getAllStaff', (req, res) => {
    console.log(req.body);
    StaffInfo.find().then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
app.get('/getSigleStaff/:id', (req, res) => {
    console.log(req.body);
    var id = req.params.id;
    if (ObjectId.isValid(id)) {
        StaffInfo.findById(id).then((doc) => {
            if (!doc) {
                return res.status(404).send();
            }
            res.send(doc);
        }).catch((err) => {
            res.status(404).send();
        });
    }
});
app.patch('/updateStaffInfo/:id', (req, res) => {
    var id = req.params.id;
    if (ObjectId.isValid(id)) {
        var body = _.pick(req.body, ["email", "phoneNumber", "permanentAddress", "bloodGroup", "educationQualification"]);
        body.email = "ashoknitc14@gmail.com";
        body.phoneNumber = "8989898989";
        body.permanentAddress = "Bangalore,Karnataka,India";
        body.bloodGroup = "o+";
        body.educationQualification = "MCA";
        StaffInfo.findByIdAndUpdate(id, {
            $set: body
        }, {
            new: true
        }).then((doc) => {
            if (!doc) {
                return res.status(404).send();
            }
            res.send(doc);
        }).catch((err) => {
            res.status(404).send();
        })
    }
});
app.delete('/deleteStaff/:id', (req, res) => {
    var id = req.params.id;
    if (ObjectId.isValid(id)) {
        StaffInfo.findByIdAndRemove(id).then((doc) => {
            if (!doc) {
                return res.status(404).send();
            }
            res.send(doc);
        }).catch((err) => {
            res.status(404).send();
        });
    }
});
app.delete('/deleteStaff', (req, res) => {
    StaffInfo.remove({}).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});

app.listen(3001);
console.log("listening at http://localhost:3000");