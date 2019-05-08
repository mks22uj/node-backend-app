var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var classSectionSchema = mongoose.Schema({
    classId: {
        type: Number,
        require: true
    },
    sectionName: {
        type: String,
        require: true
    },
    classRoom: {
        type: String,
        default: null
    },
    createdBy: {
        type: Number,
        default: null
    },
    maxStrength: {
        type: Number,
        default: null
    },
    totalStrength: {
        type: Number,
        default: null
    }

});
var classSectionInfo = mongoose.model('class_section', classSectionSchema);
module.exports = {
    classSectionInfo
}