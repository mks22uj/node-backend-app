var mongoose = require('./db/mongoose');
var express = require('express');
var app = express();
app.use('/login-server', require('./sms-controllers/ParentController'));
app.use("/assign-task-service", require('./sms-controllers/AssignTaskController'));
app.use("/class-service", require('./sms-controllers/ClassController'));
app.use("/leave-service", require('./sms-controllers/LeaveController'));
app.use("/roles-service", require('./sms-controllers/RolesController'));
app.use("/school-service", require('./sms-controllers/SchoolController'));
app.use("/staff-service", require('./sms-controllers/StaffController'));
app.use("/student-service", require('./sms-controllers/StudentController'));
app.use("/activity-service", require('./sms-controllers/AnnualActivityController'));
app.listen(3001);
console.log("Listening at http://localhost:3001");