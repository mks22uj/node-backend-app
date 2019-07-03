var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var UserSchema = mongoose.Schema({

    staffFirstName: {
        type: String,
        require: true
    },
    staffLastName: {
        type: String,
        require: true
    },
    roleId: {
        type: Number,
        minlength: 1,
        require: true
    },
    roleTitle: {
        type: String,
        default: null
    },
    employeeId: {
        type: Number
    },
    schoolId: {
        type: Number
    },
    joiningDate: {
        type: String,
        default: "2018-12-12"
    },
    previousOrganization: {
        type: String,
        default: null
    },
    presentAddress: {
        type: String,
        default: null
    },
    userName: {
        type: String,
        minlength: 1,
        unique: true,
    },
    passKey: {
        type: String,
        minlength: 1,
        unique: true,
    },
    createdBy: {
        type: Number,
        default: null
    },
    currentlyAssociated: {
        type: Boolean,
        default: true
    },
    createTime: {
        type: Number,
        default: new Date().getMilliseconds()
    },
    profilePhoto: {
        type: String,
        default: null
    },
    session: {
        type: String,
        default: new Date().getDate()
    },
    email: {
        type: String,
        default: null
    },
    phoneNumber: {
        type: Number,
        default: null
    },
    permanentAddress: {
        type: String,
        default: null
    },
    dob: {
        type: String,
        default: new Date().getMilliseconds()
    },
    gendar: {
        type: String,
        default: "Male"
    },
    bloodGroup: {
        type: String,
        default: null
    },
    educationQualification: {
        type: String,
        default: null
    },
    nationality: {
        type: String,
        default: "Indian"
    },
    birthPlace: {
        type: String,
        default: "India"
    },
    motherTounge: {
        type: String,
        default: null
    },
    fatherName: {
        type: String,
        default: null
    },
    motherName: {
        type: String,
        default: null
    },
    religion: {
        type: String,
        default: "Hindu"
    },
    cast: {
        type: String,
        default: null
    },
    adhar: {
        type: String,
        default: null
    },
    classSectionInfo: {
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
            require: true
        }
    }]
});
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
UserSchema.statics.findByToken = function (token) {
    var user = this;
    var decoded;
    try {
        decoded = jwt.verify(token, 'ashok123');
    } catch (e) {

    }
    return user.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};
UserSchema.methods.removeToken = function (token) {
    var user = this;
    return user.update({
        $pull: {
            tokens: {
                token
            }
        }
    });
};
UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('passKey')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.passKey, salt, (err, hash) => {
                user.passKey = hash;
                next();
            });
        });
    } else {
        next();
    }
});
UserSchema.statics.findByCredentials = function (userName, passKey) {
    var User = this;
    return User.findOne({
        userName
    }).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(passKey, user.passKey, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
};

var StaffInfo = mongoose.model('staff_Main', UserSchema);

module.exports = {
    StaffInfo: StaffInfo
}