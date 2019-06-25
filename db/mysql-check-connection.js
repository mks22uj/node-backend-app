var mysql = require("mysql");
var conenction = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodedb"
});
conenction.connect((err) => {
    if (err) throw err;
    console.log("Connection established Successfully");
});