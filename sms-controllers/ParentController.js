var {
    mongoose
} = require('../db/mongoose');
var {
    parentInfo
} = require('../sms-models/ParentInfo');
var {
    ObjectID
} = require('mongodb');
var express = require('express');
const formidable = require('express-formidable');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(formidable());
router.post('/addParent', (req, res) => {
    console.log(req.fields);
    var parentdata = new parentInfo(req.fields);
<<<<<<< HEAD

    //postData without Token Section Starts
    // parentdata.save().then((user) => {
    //     if (!user) {
    //         return res.status(404).send();
    //     }
    //     res.send(user);
    // }).catch((err) => {
    //     res.status(404).send();
    // });
    //postData without Token Section Ends
    parentdata.save().then((parentdata) => {
        return parentdata.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(parentdata);
    }).catch((err) => {
        res.status(404).send();
    })

    /*
    parentdata.save().then((parentdata) => {
        return parentdata.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(parentdata);
    }).catch((err) => {
        res.status(404).send();
    });*/
});
router.get('/getInfoByTokenByauth', (req, res) => {
    var token = req.header('x-auth');
    parentInfo.findByToken(token).then((user) => {
        if (!user) {
=======
    /*parentdate.save().then((doc) => {
        if (!doc) {
>>>>>>> 07256d3f5c4e8d17a8cf3281063f2bae7828c9dd
            return res.status(404).send();
        }
        res.send(user);
    }).catch((err) => {
        res.status(404).send();
    });*/
    parentdata.save().then((parentdata) => {
        return parentdata.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(parentdata);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/getParentList', (req, res) => {
    console.log(req.body);
    parentInfo.find({}).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/getInfoByToken', (req, res) => {
    var token = req.header('x-auth');
    parentInfo.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        res.send(user);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.get('/getParentinfo/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    parentInfo.findById(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.use(formidable());
router.put('/updateParentInfo', (req, res) => {
    console.log(req.fields);
    var parentData = new parentInfo(req.fields);
    parentInfo.update({
        _id: req.fields._id
    }, parentData).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
router.delete('/deleteParentInfo/:id', (req, res) => {
    console.log(req.body);
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    parentInfo.findByIdAndRemove(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(404).send();
    });
});
module.exports = router;