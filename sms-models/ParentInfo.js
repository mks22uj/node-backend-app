var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
mongoose.Promise = global.Promise;
var UserSchema = mongoose.Schema({
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
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

//Generate Token Process Starts 
UserSchema.methods.generateAuthToken = function () {
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

//Generate Token Process Ends 


UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        return Promise.reject();
    }
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

var parentInfo = mongoose.model('parent_main', UserSchema);
module.exports = {
    parentInfo: parentInfo
}