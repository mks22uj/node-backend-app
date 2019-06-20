var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var start_date = new Date();
var strt_date = start_date.getFullYear() + "-" + (start_date.getMonth() + 1) + "-" + start_date.getDate();
var HolidayInfo = mongoose.model("academic_holiday", {

    createdBy: {
        type: Number,
        required: true
    },
    createTime: {
        type: Date,
        default: new Date().getMilliseconds()
    },
    holidayDescription: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    startDate: {
        type: Date,
        default: strt_date
    },
    endDate: {
        type: Date,
        default: Date.now()
    },
    schoolId: {
        type: Number,
        default: 123

    },
    holidayType: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    holidayTypeId: {
        type: Number,
        default: 123
    },
    holidayTypeTitle: {
        type: String,
        trim: true,
        required: true,
        minlength: 1
    },
    holidayTitle: {
        type: String,
        trim: true,
        required: true,
        minlength: 1
    },
    holidayImagePath: {
        type: String,
        default: null
    },

    session: {
        type: String,
        default: Date.now()
    }
});
module.exports = {
    HolidayInfo: HolidayInfo
}