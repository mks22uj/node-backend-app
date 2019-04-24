var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var StaffInfo = mongoose.model('staff_Main', {

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
        default: new Date().getDate()
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
    }
});
module.exports = {
    StaffInfo: StaffInfo
}