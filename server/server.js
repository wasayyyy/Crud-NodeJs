// Require express and create an instance of it
var express = require('express');
var app = express();
var mysql = require('mysql');
var cors = require('cors');
var bodyParser = require('body-parser');


var db = mysql.createPool({
    host: "localhost",
    username: "root",
    password: "root",
    database: "cruddb"
});

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


// on the request to root (localhost:3000/)
app.get('/', (req, res) => {
    res.send('<b>My</b> first express http server');
});

// On localhost:3000/welcome
app.post('/db/insert', (req, res) => {
    const lname = req.body.lname;
    const fname = req.body.fname;
    console.log(lname, fname)
    const sql = "INSERT crud (firstname, lastname) VALUES(?, ?)";
    db.query(sql, [fname, lname], (err, result) => {
        console.log(err);
    })
});

app.get('/db/select', (req, res) => {
    console.log(db)
    const sql = "ALTER USER 'root'@'localhost' IDENTIFIED BY 'password'; " //"SELECT * FROM crud";
    db.query(sql, (err, result) => {
        
        res.send(result);
    })
    
});

// Change the 404 message modifing the middleware
app.use((req, res, next) => {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// start the server in the port 3000 !
app.listen(3001, () => {
    console.log('Example app listening on port 3001.');
});