var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var ClassInfo = mongoose.model('class_main', {
    schoolId: {
        type: Number,
        require: true
    },
    classNum: {
        type: String,
        require: true
    },
    createdBy: {
        type: Number,
        default: null
    }
});
module.exports = {
    ClassInfo: ClassInfo
}