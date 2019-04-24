var {
    mongoose
} = require('../qnabu-db/mongoose');
var {
    ObjectID
} = require('mongodb');
var {
    StudentInfo
} = require('../qnabu-models/StudentInfo');
var express = require('express');
var bodyParser = require('body-parser');

var formidable = require('express-formidable');
var app = express();
app.use(formidable());
//app.use(bodyParser.json());
app.post('/addStudent', (req, res) => {
    console.log(req.fields);
    var studentData = new StudentInfo(req.fields);
    // var studentData = new StudentInfo({
    //     schoolId: req.fields.schoolId,
    //     studentFirstName: req.fields.studentFirstName,
    //     studentLastName: req.fields.studentLastName,
    //     email: req.fields.email,
    //     phoneNumber: req.fields.phoneNumber,
    //     profileFile: req.fields.profileFile,
    //     dob: req.fields.dob,
    //     studentParentId: req.fields.studentParentId,
    //     createdBy: req.fields.createdBy,
    //     classId: req.fields.classId,
    //     lastSchool: req.fields.lastSchool,
    //     presentAddress: req.fields.presentAddress,
    //     applicationNo: req.fields.applicationNo,
    //     applicationDate: req.fields.applicationDate,
    //     gender: req.fields.gender,
    //     bloodGroup: req.fields.bloodGroup,
    //     religion: req.fields.religion,
    //     cast: req.fields.cast,
    //     nationality: req.fields.nationality,
    //     birthPlace: req.fields.birthPlace,
    //     motherTongue: req.fields.motherTongue,
    //     permanentAddress: req.fields.permanentAddress,
    //     adhar: req.fields.adhar
    // });
    studentData.save().then((doc) => {
        res.send(doc);
        res.end();
    }).catch((err) => {
        res.send(JSON.stringify(err, undefined, 2));
        res.end();
    });
});
app.get('/getStudents', (req, res) => {
    console.log(req.fields);
    StudentInfo.find().then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
        res.end();
    }).catch((err) => {
        res.send(JSON.stringify(err, undefined, 2));
    });
});
app.get('/getStudents/:id', (req, res) => {
    console.log(req.fields);
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    StudentInfo.findById(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
app.use(formidable());
app.put('/update', (req, res) => {
    var studentData = new StudentInfo(req.fields);
    var id = req.fields._id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    StudentInfo.updateOne({
        '_id': req.fields._id
    }, studentData, {
        new: true
    }).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc)
    }).catch((err) => {
        res.status(404).send();
    });

});
app.delete('/deleteStudent/:id', (req, res) => {
    console.log(req.body);
    StudentInfo.findByIdAndRemove(req.params.id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
app.delete('/deleteAllStudents', (req, res) => {
    StudentInfo.remove({}).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
app.listen(3001);
console.log("Listening at http://localhost:3001/");