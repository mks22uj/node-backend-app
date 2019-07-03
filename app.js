var mongoose = require('./db/mongoose');
var express = require('express');

const {
    SHA256
} = require('crypto-js');
var app = express();
app.use('/board-subject', require('./sms-controllers/BoardSubjectController'));
app.use('/parent-service', require('./sms-controllers/ParentController'));
app.use("/assign-task-service", require('./sms-controllers/AssignTaskController'));
app.use("/class-service", require('./sms-controllers/ClassController'));
app.use("/leave-service", require('./sms-controllers/LeaveController'));
app.use("/roles-service", require('./sms-controllers/RolesController'));
app.use("/school-service", require('./sms-controllers/SchoolController'));
app.use("/staff-service", require('./sms-controllers/StaffController'));
app.use("/student-service", require('./sms-controllers/StudentController'));
app.use("/activity-service", require('./sms-controllers/AnnualActivityController'));
app.use("/holiday-service", require('./sms-controllers/AcademicHolidayController'));
app.use("/board-class-service", require('./sms-controllers/BoardClassController'));
app.use("/test-service", require('./sms-controllers/TestController'));
app.use("/topic-service", require('./sms-controllers/TopicController'));
app.use("/notice-service", require('./sms-controllers/NoticeController'));
app.use("/issue-service", require('./sms-controllers/SchoolIssueController'));
app.use("/class-subject-map-service", require('./sms-controllers/ClassSubjectMappingController'));
app.use("/weather-service", require("./sms-controllers/WeatherController"));
app.listen(3001);
console.log("Listening at http://localhost:3001");
console.log("welcome");