var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser')
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "qnabuprod"
});
connection.connect((err) => {
    if (err) throw err;
    //console.log("Connection established successfully");
});
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.use('/getAcademicHoliday', (req, res) => {
    console.log(req.body);
    connection.query("select * from academic_holidays", (err, results, fields) => {
        if (err) throw err;
        res.send(results);
    });
});
app.listen(3001);
console.log("Listening at http://localhost:3001");