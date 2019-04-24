var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var RoleInfo = mongoose.model("Role", {
    role_Title: {
        type: String,
        require: true,
        unique: true
    },
    createTime: {
        type: Date,
        default: new Date().getMilliseconds()
    }
});
module.exports = {
    RoleInfo: RoleInfo
}