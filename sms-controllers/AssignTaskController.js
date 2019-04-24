var {
    mongoose
} = require('../db/mongoose');
var {
    AssignTaskInfo
} = require('../sms-models/AssignTaskInfo');
var {
    ObjectID
} = require('mongodb');
var express = require('express');
var formidable = require('express-formidable');
var router = express.Router();
router.use(formidable());
router.post('/assignTask_to_Staff', (req, res) => {
    console.log(req.fields);
    var taskInfo = new AssignTaskInfo(req.fields);
    taskInfo.save().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/getAssign_task_info', (req, res) => {
    AssignTaskInfo.find().then((doc) => {
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