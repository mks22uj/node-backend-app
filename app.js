/*const { SHA256 } = require('crypto-js');
var message = 'HI I am Ashok';
var hashMessage = SHA256(message).toString();
console.log("Original String =" + message);
console.log("HashMessage =" + hashMessage);
var data = {
    id: 4
}
var token = {
    data: data,
    hash: SHA256(JSON.stringify(data) + 'Something New').toString()
}

data.id = 5;
var hashValues = SHA256(JSON.stringify(token.data) + 'Something New').toString();
token.hash = SHA256(JSON.stringify(token.data)).toString();
if (hashValues == token.hash) {
    console.log("Data Was Not Changed");
} else {
    console.log("Data Was Changed");
}*/

/*
const jwt = require('jsonwebtoken');
var message = "HI I am  Ashok";
var encode_value = jwt.sign(message, 'abc123');
console.log("Encode URL =" + encode_value);
var decode_url = jwt.verify(encode_value, 'abc123');
console.log("Decode URL =" + decode_url);*/

var mongoose = require('./db/mongoose');
var express = require('express');

const {
    SHA256
} = require('crypto-js');
/*
var message = "HI I am Ashok";

var data = {
    id: 4
};
var token = {
    data: data,
    hash: SHA256(JSON.stringify(data) + "Somethin New").toString()
}
token.data.data = 5;
token.hash = SHA256(JSON.stringify(data)).toString();
var resultHash = SHA256(JSON.stringify(token.data) + "Somethin New");
if (resultHash == token.hash) {
    console.log("Data Was Not Changed");
} else {
    console.log("Data was Changed");
}
*/

//Token System Satrts 
/*
const jwt = require('jsonwebtoken');
var data = {
    id: 10
};
var encode_Data = jwt.sign(data, 'abc123');
var decode_Data = jwt.verify(encode_Data, 'abc123').toString();
console.log("Encode Data =" + encode_Data);
console.log("Decode_Data =" + decode_Data);
*/

//Token System Satrts 


//Encryption Section Starts 
var bcrypt = require('bcryptjs');
var password = "ashokjhf";
bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log("hashValue ==" + hash);

    });
});
var hashedValue = "$2a$10$QgYuBG3WcRqz/IeoTjynJOF7eKlEulN71b9n/9UdyWjlrudZ4gMsS";
bcrypt.compare(password, hashedValue, (err, res) => {
    console.log("Response Code =" + res);
});
//Encryption Section Ends

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
app.listen(3001);
console.log("Listening at http://localhost:3001");
console.log("welcome");