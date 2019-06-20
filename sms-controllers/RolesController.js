var {
    mongoose
} = require('../db/mongoose');
var {
    RoleInfo
} = require('../sms-models/RoleInfo');
var {
    ObjectID
} = require('mongodb');
var express = require('express');
var formidable = require('express-formidable');
var router = express.Router();
router.use(formidable());
router.post('/addRoles', (req, res) => {
    console.log(req.fields);
    var roleData = new RoleInfo(req.fields);
    roleData.save().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    })
});
router.get('/getRoles', (req, res) => {
    console.log(req.fields);
    RoleInfo.find({}).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/getRoles/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    RoleInfo.find({
        "_id": id
    }).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.use(formidable());
router.put('/updateRole', (req, res) => {
    console.log(req.fields);
    var roleData = new RoleInfo(req.fields);
    RoleInfo.updateOne({
        "_id": req.fields._id
    }, roleData, {
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
router.delete('/deleRole/:id', (req, res) => {
    console.log(req.body);
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    RoleInfo.findByIdAndRemove(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.delete('/deleteAllRoles', (req, res) => {
    console.log(req.body);
    RoleInfo.remove({}).then((doc) => {
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
// console.log("Listening at http://localhost:3001/");