var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var subjectMapSchema = mongoose.Schema({
    create_time: {
        type: Date,
        default: new Date().getMilliseconds()
    },
    created_by: {
        type: Number,
        default: null
    },
    modify_time: {
        type: Date,
        default: null
    },
    eligible_class_end: {
        type: String,
        require: true
    },
    eligible_class_start: {
        type: String,
        require: true
    },
    session: {
        type: String,
        default: "2018-19"
    },
    subject_id: {
        type: Number,
        require: true
    },
    teacher_id: {
        type: Number,
        require: true
    }
});
var staff_subject_Map_Info = mongoose.model("staff_subject_mapping", subjectMapSchema);
module.exports = {
    staff_subject_Map_Info
}