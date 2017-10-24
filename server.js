var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
// install and require the mongoose library
var mongoose = require('mongoose');

var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/assignment';

// if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
//     connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
//         process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
//         process.env.OPENSHIFT_MONGODB_DB_HOST + ":" +
//         process.env.OPENSHIFT_MONGODB_DB_PORT + "/" +
//         process.env.OPENSHIFT_APP_NAME;
// }

var conn2 = "mongodb://rgaswin:rgaswin@ds231205.mlab.com:31205/americahikes";

// connect to the database
var db = mongoose.connect(conn2);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());


app.use(session({
    secret: "Aswin",
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// server side 'app' reference for assignment code.
require("./public/assignment/server/app.js")(app, db, mongoose);

// server side 'app' reference for project code.
require("./public/project/server/app.js")(app, db, mongoose);

app.get('/hello', function (req, res) {
    res.send('hello world');
});

app.listen(port, ipaddress);
