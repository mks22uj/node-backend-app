var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var classSchema = mongoose.Schema({
    classId: {
        type: Number,
        require: true
    },
    sectionId: {
        type: Number,
        require: true
    },
    subjectId: {
        type: Number,
        require: true
    },
    periodType: {
        type: String,
        require: true
    },
    teacherId: {
        type: Number,
        require: true
    },
    onMonday: {
        type: Boolean,
        default: false
    },
    onTuesday: {
        type: Boolean,
        default: false
    },
    onWednesday: {
        type: Boolean,
        default: false
    },
    onthursday: {
        type: Boolean,
        default: false
    },
    onFriday: {
        type: Boolean,
        default: false
    },
    onSaturday: {
        type: Boolean,
        default: false
    },
    maxStrength: {
        type: Number,
        default: null
    },
    createdBy: {
        type: Number,
        default: null
    },
    monTiming: {
        type: String,
        default: null
    },
    tuesTiming: {
        type: String,
        default: null
    },
    wedTiming: {
        type: String,
        default: null
    },
    thursTiming: {
        type: String,
        default: null
    },
    FriTiming: {
        type: String,
        default: null
    },
    satTiming: {
        type: String,
        default: null
    },
    duration: {
        type: Number,
        default: null
    }
});
var class_subjectInfo = mongoose.model('class_subject_mapping', classSchema);
module.exports = {
    class_subjectInfo
}