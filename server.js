var express = require('express');
var app = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// server side 'app' reference for assignment code.
require("./public/assignment/server/app.js")(app);

// server side 'app' reference for project code.
require("./public/project/server/app.js")(app);

app.get('/hello', function(req, res){
    res.send('hello world');
});

app.listen(port, ipaddress);
