var mongoose = require('../db/mongoose');
var {
    BoardClassInfo
} = require('../sms-models/BoardClassInfo');
var express = require('express');
var formidable = require('express-formidable');
var {
    ObjectID
} = require('mongodb');
var router = express();
router.use(formidable());
router.post('/add_board_class', (req, res) => {
    var boardClassData = new BoardClassInfo(req.fields);
    boardClassData.save().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/get-boardClass', (req, res) => {
    BoardClassInfo.find().then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/get-boardClass/:id', (req, res) => {
    var id = req.params.id;
    BoardClassInfo.find({
        "boardId": id
    }).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {});
});
module.exports = router;