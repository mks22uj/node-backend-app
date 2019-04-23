var {mongoose}=require('../db/mongoose');
var {parentInfo}=require('../sms-models/ParentInfo');
var express=require('express');
const formidable=require('express-formidable');
var bodyParser=require('body-parser');
var router=express.Router();
router.use(formidable());
router.post('/addParent',(req,res)=>{
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
module.exports=router;

