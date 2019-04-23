var mongoose=require('./db/mongoose');
var express=require('express');
var app=express();
app.use('/login-server',require('./sms-controllers/ParentController'));
app.listen(3001);
console.log("Listening at http://localhost:3001");
