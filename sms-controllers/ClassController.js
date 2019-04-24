var {
    mongoose
} = require('../db/mongoose');
var {
    ClassInfo
} = require('../sms-models/ClassInfo');
var express = require('express');
var {
    ObjectID
} = require('mongodb');
var bodyParser = require('body-parser');
var formidable = require('express-formidable');
var router = express.Router();
router.use(formidable());
router.post('/addClass', (req, res) => {
    console.log(req.fields);
    var classData = new ClassInfo(req.fields);
    classData.save().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });

});
router.get('/getClass', (req, res) => {
    ClassInfo.find().then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/getClass/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    ClassInfo.findById(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.use(formidable());
router.put('/updateClass', (req, res) => {
    console.log(req.fields);
    var classData = new ClassInfo(req.fields);
    ClassInfo.updateOne({
        '_id': req.fields._id
    }, classData, {
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
router.delete('/deleteClass/:id', (req, res) => {
    console.log(req.body);
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    ClassInfo.findByIdAndRemove(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.delete('/deleteAllClass', (req, res) => {
    ClassInfo.remove({}).then((doc) => {
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
// console.log("Listening at http://localhost:3000/");