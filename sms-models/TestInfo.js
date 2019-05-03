var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var TestInfo = mongoose.model("test_main", {
    schoolId: {
        type: Number,
        minlength: 1,
        require: true
    },
    classId: {
        type: Number,
        minlength: 1,
        require: true
    },
    sectionId: {
        type: Number,
        minlength: 1,
        require: true
    },
    teacherId: {
        type: Number,
        minlength: 1,
        require: true
    },
    createdBy: {
        type: Number,
        minlength: 1,
        require: true
    },
    subjectId: {
        type: Number,
        minlength: 1,
        require: true
    },
    testDate: {
        type: Date,
        default: new Date().getDate()
    },
    testDuration: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        minlength: 1,
        require: true
    },
    maxMark: {
        type: Number,
        minlength: 1,
        maxlength: 2,
        require: true
    },
    passingMark: {
        type: Number,
        minlength: 1,
        maxlength: 2,
        require: true
    },
    status: {
        type: String,
        default: "Inactive"
    },
    testType: {
        type: Number,
        require: true
    }
});
module.exports = {
    TestInfo
};