var {mongoose}=require('./db/mongoose');
var {parentInfo}=require('./sms-models/ParentInfo');
var express=require('express');
var formidable=require('formidable');
var bodyParser=require('body-parser');
var app=express.Router();


app.post('/addParent',(req,res)=>{
    console.log(req.fields);
    var parentdate=new parentInfo(req.fields);
    parentdate.save().then((doc)=>{
        if(!doc)
        {
            return res.status(404).send();
        }
        res.send(doc);
    }).catch((err)=>{
        res.status(404).send();
    });
});
app.listen(3001);
console.log("Listening at http://localhost:3001");

