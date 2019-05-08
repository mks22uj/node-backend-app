var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var userSchema = mongoose.Schema({
    board_id: {
        type: Number,
        require: true
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    subjectName: {
        type: String,
        require: true
    }
});
var subjectInfo = mongoose.model('subject', userSchema);
module.exports = {
    subjectInfo
}