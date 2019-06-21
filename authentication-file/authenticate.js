var {
    ParentInfo
} = require('../sms-models/ParentInfo');
var authenticate = ((req, res, next) => {
    var token = req.header('x-auth');
    ParentInfo.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((err) => {
        res.status(404).send();
    });
});
module.exports = {
    authenticate
}