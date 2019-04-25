var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var AnnualActivity = mongoose.model("annual_activity", {
    createdBy: {
        type: Number,
        default: new Date().getMilliseconds()
    },
    createTime: {
        type: Number,
        default: new Date().getMilliseconds()
    },
    schoolId: {
        type: Number,
        default: 123
    },
    activityTitle: {
        type: String,
        trim: true,
        minlength: 1,
        required: true
    },
    partClassStartId: {
        type: Number,
        default: new Date().getMilliseconds()
    },
    partClassEndId: {
        type: Number,
        default: new Date().getMilliseconds()
    },
    partSectionStartId: {
        type: Number,
        default: new Date().getMilliseconds()
    },
    partSectionEndId: {
        type: Number,
        default: new Date().getMilliseconds()
    },
    activityDescription: {
        type: String,
        default: null
    },
    participationType: {
        type: String,
        default: null
    },
    startDate: {
        type: Date,
        default: new Date().getMilliseconds()
    },
    endDate: {
        type: Date,
        default: Date.now()
    },
    awardDescription: {
        type: String,
        default: null
    },
    session: {
        type: String,
        default: "2018-19"
    },
    partSectionEndName: {
        type: String,
        default: "A"
    },
    partClassEndName: {
        type: String,
        default: "10"
    },
    partClassStartName: {
        type: String,
        default: "1"
    },
    partSectionStartName: {
        type: String,
        default: "D"
    }
});
module.exports = {
    AnnualActivity: AnnualActivity
}