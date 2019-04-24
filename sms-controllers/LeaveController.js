var {
    mongoose
} = require('../db/mongoose');
var {
    ObjectID
} = require('mongodb');
var {
    LeaveInfo
} = require('../sms-models/LeaveInfo');
var express = require('express');
var formidable = require('express-formidable');
var router = express.Router();
router.use(formidable());
router.post('/postLeaveRequest', (req, res) => {
    console.log(req.fields);
    var leaveData = new LeaveInfo(req.fields);
    leaveData.save().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/getLeaveinfo', (req, res) => {
    LeaveInfo.find().then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
module.exports = router;

// app.listen(3001);
// console.log("Listening at http://localhost:3001");