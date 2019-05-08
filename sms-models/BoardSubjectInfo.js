var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var userSchema = mongoose.Schema({
    board_id: {
        type: Number,
        require: treu
    },
    createTime: {
        type: Date,
        default: new Date().getMilliseconds()
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