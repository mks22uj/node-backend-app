var express = require('express');
var _ = require('lodash');
var bodyParser = require('body-parser');
var formidable = require('express-formidable');
var {
    ObjectId
} = require('mongodb');
var {
    mongoose
} = require('../db/mongoose');
var {
    StaffInfo
} = require('../sms-models/SchoolStaffInfo');
var router = express.Router();
//router.use(bodyParser.json());
router.use(formidable());
router.post('/addStaff', (req, res) => {
    console.log(req.fields);
    var staffData = new StaffInfo(req.fields);
    staffData.save().then((staffData) => {
        return staffData.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send({
            "error": false,
            "errorCode": null,
            "message": null,
            "response": staffData
        });
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/find/info/By/Token', (req, res) => {
    var token = req.header('x-auth');
    StaffInfo.findByToken(token).then((doc) => {
        if (!doc) {
            return res.status(404).send({
                "error": false,
                "errorCode": null,
                "message": null,
                "response": "Token Not Found"
            });
        }
        res.send({
            "error": false,
            "errorCode": null,
            "message": null,
            "response": doc
        });
    });
});
router.get('/getAllStaff', (req, res) => {
    console.log(req.fields);
    StaffInfo.find().then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send({
            "error": false,
            "errorCode": null,
            "message": null,
            "response": doc
        });
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/getSigleStaff/:id', (req, res) => {
    console.log(req.fields);
    var id = req.params.id;
    if (ObjectId.isValid(id)) {
        StaffInfo.findById(id).then((doc) => {
            if (!doc) {
                return res.status(404).send();
            }
            res.send({
                "error": false,
                "errorCode": null,
                "message": null,
                "response": doc
            });
        }).catch((err) => {
            res.status(404).send();
        });
    }
});
router.get('/getSchoolStaffList/:school_id', (req, res) => {
    var school_id = req.params.school_id;
    StaffInfo.find({
        "schoolId": school_id
    }).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send({
            "error": false,
            "errorCode": null,
            "message": null,
            "response": doc
        });
    }).catch((err) => {
        return res.status(404).send();
    });
});

router.patch('/updateStaffInfo/:id', (req, res) => {
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
            res.send({
                "error": false,
                "errorCode": null,
                "message": null,
                "response": doc
            });
        }).catch((err) => {
            res.status(404).send();
        })
    }
});
router.delete('/deleteStaff/:id', (req, res) => {
    var id = req.params.id;
    if (ObjectId.isValid(id)) {
        StaffInfo.findByIdAndRemove(id).then((doc) => {
            if (!doc) {
                return res.status(404).send();
            }
            res.send({
                "error": false,
                "errorCode": null,
                "message": null,
                "response": doc
            });
        }).catch((err) => {
            res.status(404).send();
        });
    }
});
router.delete('/deleteStaff', (req, res) => {
    StaffInfo.remove({}).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send({
            "error": false,
            "errorCode": null,
            "message": null,
            "response": doc
        });
    }).catch((err) => {
        res.status(404).send();
    });
});
router.use(formidable());
router.post("/staff/login", (req, res) => {
    var body = _.pick(req.fields, ["userName", "passKey"]);
    console.log(body.userName + "  " + body.passKey);
    StaffInfo.findByCredentials(body.userName, body.passKey).then((user) => {
        res.send({
            "error": false,
            "errorCode": null,
            "message": null,
            "response": user
        });
    }).catch((err) => {
        res.status(404).send({
            "error": true,
            "errorCode": true,
            "message": "Invalid Username/password",
            "response": null
        });
    });
});
router.use(formidable())
router.post('/staff/login/with/token', (req, res) => {
    var body = _.pick(req.fields, "userName", "passKey");
    StaffInfo.findByCredentials(body.userName, body.passKey).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        }).catch((err) => {
            res.status(404).send();
        });
    });
});
var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    StaffInfo.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((err) => {
        res.status(404).send();
    });
};
router.delete("/staff/logout", authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(404).send();
    });
});
module.exports = router;
// app.listen(3001);
// console.log("listening at http://localhost:3000");