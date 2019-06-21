var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
var UserSchema = mongoose.Schema({
    userName: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        unique: true
    },
    fatherName: {
        type: String,
        minlength: 1,
        maxlength: 12,
        require: true
    },
    motherName: {
        type: String,
        minlength: 1,
        maxlength: 12,
        require: true
    },
    guardianName: {
        type: String,
        require: true
    },
    relationshipWithChild: {
        type: String,
        require: true
    },
    emailId: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Enter Valid Email Id"
        }
    },
    phoneNumber: {
        type: String,
        default: null
    },
    alternatePhoneNumber: {
        type: String,
        default: null
    },
    adhar: {
        type: String,
        default: null
    },
    currentAddress: {
        type: String,
        default: null
    },
    permanentAddress: {
        type: String,
        default: null
    },
    profileDpFile: {
        type: String,
        default: null
    },
    tokens: [{
        token: {
            type: String,
            require: true
        },
        access: {
            type: String,
            require
        }
    }]
});
UserSchema.statics.findByToken = function (token) {
    var user = this;
    var decoded;
    try {
        decoded = jwt.verify(token, 'ashok123');
    } catch (e) {

    }
    return user.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};
//This method is Used to get Particular data as a properties Value
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, [
        "phoneNumber",
        "alternatePhoneNumber",
        "adhar",
        "currentAddress",
        "permanentAddress",
        "profileDpFile",
        "_id",
        "userName",
        "password",
        "fatherName",
        "motherName",
        "guardianName",
        "relationshipWithChild",
        "emailId",
        "tokens"
    ]);
};
//This is used to Gnerate to store token value into database
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, 'ashok123').toString();
    user.tokens.push({
        access,
        token
    });
    return user.save().then(() => {
        return token;
    });
};
var ParentInfo = mongoose.model("parent_main", UserSchema);
module.exports = {
    ParentInfo
}