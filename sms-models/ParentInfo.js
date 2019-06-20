var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
mongoose.Promise = global.Promise;
<<<<<<< HEAD
var UserSchema = mongoose.Schema({
=======
var ParentSchema = mongoose.Schema({
>>>>>>> 07256d3f5c4e8d17a8cf3281063f2bae7828c9dd
    userName: {
        type: String,
        minlength: 1,
        require: true,
        unique: true
    },
    passKey: {
        type: String,
        minlength: 1,
        require: true,
        unique: true
    },
    fatherName: {
        type: String,
        minlength: 1,
        require: true
    },
    motherName: {
        type: String,
        minlength: 1,
        require: true
    },
    guardianName: {
        type: String,
        minlength: 1
    },
    relationshipWithChild: {
        type: String,
        minlength: 1
    },
    emailId: {
        type: String,
        minlength: 1,
        require: true
    },
    phoneNumber: {
        type: String,
        minlength: 1,
        require: true
    },
    alternatePhoneNumber: {
        type: String,
        minlength: 1
    },
    adhar: {
        type: String,
        minlength: 1
    },
    currentAddress: {
        type: String
    },
    permanentAddress: {
        type: String
    },
    profileDpFile: {
        type: String,
        default: null
    },
    tokens: [{
<<<<<<< HEAD
        access: {
            type: String,
            required: true
        },
        token: {
=======
        token: {
            type: String,
            required: true
        },
        access: {
>>>>>>> 07256d3f5c4e8d17a8cf3281063f2bae7828c9dd
            type: String,
            required: true
        }
    }]
});
<<<<<<< HEAD

//Generate Token Process Starts 
UserSchema.methods.generateAuthToken = function () {
=======
ParentSchema.methods.generateAuthToken = function () {
>>>>>>> 07256d3f5c4e8d17a8cf3281063f2bae7828c9dd
    var user = this;
    var access = 'auth';
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, 'abc123').toString();
    user.tokens.push({
        access,
        token
    });
    return user.save().then(() => {
        return token;
    });
};
<<<<<<< HEAD

//Generate Token Process Ends 


UserSchema.statics.findByToken = function (token) {
    var User = this;
=======
ParentSchema.statics.findByToken = function (token) {
    var user = this;
>>>>>>> 07256d3f5c4e8d17a8cf3281063f2bae7828c9dd
    var decoded;
    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
<<<<<<< HEAD
        return Promise.reject();
    }
    return User.findOne({
=======

    }
    return user.findOne({
>>>>>>> 07256d3f5c4e8d17a8cf3281063f2bae7828c9dd
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};
<<<<<<< HEAD

var parentInfo = mongoose.model('parent_main', UserSchema);
=======
var parentInfo = mongoose.model('parent_main', ParentSchema);
>>>>>>> 07256d3f5c4e8d17a8cf3281063f2bae7828c9dd
module.exports = {
    parentInfo: parentInfo
}