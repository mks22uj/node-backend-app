var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var NoticeInfo = mongoose.model("school_notice", {
    staff_id: {
        type: Number,
        minlength: 1,
        default: new Date().getMilliseconds()
    },
    notice_title: {
        type: String,
        minlength: 1,
        require: true
    },
    notice_content: {
        type: String,
        minlength: 1,
        require: true
    }
});
module.exports = {
    NoticeInfo
}