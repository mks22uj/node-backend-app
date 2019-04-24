var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var SchoolInfo = mongoose.model("School_Main", {
    schoolName: {
        type: String,
        require: true
    },
    schoolAddress: {
        type: String,
        require: true
    },
    schoolStateId: {
        type: Number,
        require: true
    },
    schoolCityId: {
        type: Number,
        require: true
    },
    ownerName: {
        type: String,
        require: true
    },
    regNum: {
        type: Number,
        default: null
    },
    bannerFile: {
        type: String,
        default: null
    },
    establishmentYear: {
        type: String,
        default: "2018-19"
    },
    schoolBoardId: {
        type: Number,
        require: true
    },
    schoolMediumId: {
        type: Number
    },
    logoFile: {
        type: String,
        default: null
    },
    classLower: {
        type: String,
        default: "1"
    },
    classUpper: {
        type: String,
        default: "12"
    },
    maxNumStudents: {
        type: Number,
        default: null
    }

});
module.exports = {
    SchoolInfo: SchoolInfo
}