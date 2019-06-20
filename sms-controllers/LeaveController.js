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
const _ = require("lodash");
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
    console.log(req.fields);
    LeaveInfo.find().then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.patch('/approve/Leave/request/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ["leaveStatus"]);
    body.leaveStatus = "Approved";
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    LeaveInfo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {});

});
module.exports = router;

// app.listen(3001);
// console.log("Listening at http://localhost:3001");