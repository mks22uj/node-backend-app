var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var SchoolIssueInfo = mongoose.model('school_issue', {
    create_date: {
        type: Date,
        default: new Date().getDate()
    },
    issue_content: {
        type: String,
        minlength: 1,
        require: true
    },
    issue_priority: {
        type: String,
        minlength: 1,
        default: 'Low'
    },
    issue_status: {
        type: String,
        default: null
    },
    issue_title: {
        type: String,
        minlength: 1,
        require: true
    },
    receiver_name: {
        type: String,
        default: null
    },
    receiver_role_id: {
        type: Number,
        minlength: 1,
        default: null
    },
    receiver_role_name: {
        type: String,
        default: null
    },
    receiver_staff_id: {
        type: Number,
        require: true
    },
    school_id: {
        type: Number,
        require: true
    },
    sender_email: {
        type: String,
        minlength: 1,
        default: null
    },
    sender_name: {
        type: String,
        minlength: 1,
        default: null
    },
    sender_phone_number: {
        type: String,
        minlength: 1,
        default: null
    },
    sender_role_id: {
        type: Number,
        require: true
    },
    sender_role_name: {
        type: String,
        minlength: 1,
        default: null
    },
    sender_staff_id: {
        type: Number,
        require: true
    },
    session: {
        type: String,
        default: "2018-19"
    }
});
module.exports = {
    SchoolIssueInfo
}