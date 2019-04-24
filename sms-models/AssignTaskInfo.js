var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var AssignTaskInfo = mongoose.model('assign_task_staff', {
    principal_id: {
        type: String,
        require: true
    },
    message_title: {
        type: String,
        require: true
    },
    message_content: {
        type: String,
        require: true
    },
    assign_type: {
        type: String,
        default: "some"
    },
    session: {
        type: String,
        default: "2018-19"
    },
    create_Time: {
        type: Date,
        default: new Date().getMilliseconds()
    }
});
module.exports = {
    AssignTaskInfo: AssignTaskInfo
}