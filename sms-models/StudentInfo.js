var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var StudentInfo = mongoose.model("Student_Main", {
    schoolId: {
        type: Number,
        require: true
    },
    studentFirstName: {
        type: String,
        require: true
    },
    studentLastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: Number,
        require: true
    },
    profileFile: {
        type: String,
        default: null
    },
    dob: {
        type: Date,
        require: new Date().getMilliseconds()
    },
    studentParentId: {
        type: Number,
        require: true
    },
    createdBy: {
        type: Number,
        default: null
    },
    classId: {
        type: Number,
        require: true
    },
    lastSchool: {
        type: String,
        require: true
    },
    presentAddress: {
        type: String,
        default: null
    },
    applicationNo: {
        type: Number,
        default: null
    },
    applicationDate: {
        type: Date,
        default: new Date().getMilliseconds()
    },
    gender: {
        type: String,
        default: null
    },
    bloodGroup: {
        type: String,
        default: null
    },
    religion: {
        type: String,
        default: null
    },
    cast: {
        type: String,
        default: null
    },
    nationality: {
        type: String,
        default: "Indian"
    },
    birthPlace: {
        type: String,
        default: null
    },
    motherTongue: {
        type: String,
        require: null
    },
    permanentAddress: {
        type: String,
        default: null
    },
    adhar: {
        type: String,
        default: null
    }
});
module.exports = {
    StudentInfo: StudentInfo
}