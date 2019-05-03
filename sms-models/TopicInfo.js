var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var TopicInfo = mongoose.model("subject_topic", {
    subjectId: {
        type: Number,
        minlength: 1,
        require: true
    },
    mediumId: {
        type: Number,
        minlength: 1,
        require: true
    },
    chapterTitle: {
        type: String,
        minlength: 1,
        require: true
    },
    topicTitle: {
        type: String,
        minlength: 1,
        require: true
    },
    description: {
        type: String,
        minlength: 1,
        require: true
    },
    createdBy: {
        type: Number,
        minlength: 1,
        require: true
    },
    sectionId: {
        type: Number,
        minlength: 1,
        require: true
    }
});
module.exports = {
    TopicInfo
};