var expres = require('express');
var app = expres();
const formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var form = new formidable.IncomingForm();
app.post('/',(req,res) =>{

form.parse(req, function(err, fields, files) {
    var file = files.file;
    var ext = path.extname(file.name);
    var bytes = fs.readFileSync(file.path);
    fs.writeFileSync("E:\\Image\\"+file.name,bytes,(err) =>{
        console.log('file uploaded successfully !!');
    })
    
  });

});


app.get('/',(req,res) =>{

    res.download('E:\\Image\\API_document.docx');

})

app.listen(8080,() =>  console.log('server is up on port 8080'))
