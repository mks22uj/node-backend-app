var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var LeaveInfo = mongoose.model('staff_leave', {
    staffId: {
        type: Number,
        require: true
    },
    schoolId: {
        type: String,
        require: true
    },
    startDate: {
        type: Date,
        default: new Date().getMilliseconds()
    },
    staffMessage: {
        type: String,
        require: true
    },
    endDate: {
        type: Date,
        default: new Date().getMilliseconds()
    },
    leaveType: {
        type: String,
        require: true
    },
    leaveDayType: {
        type: String,
        require: true
    }
});
module.exports = {
    LeaveInfo: LeaveInfo
}