var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require ('cors');
const bodyParser = require ('body-parser');
const methodOverride = require ('method-override');
const session = require ('express-session');
const SECRET_KEY = process.env.SECRET_KEY;


var indexRouter = require('./routes/index');

const mongodb = require ('./db/mongo');

mongodb.initClientDbConnection();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({
  exposedHeaders: ['Authorization'],
  origin: '*'
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));

app.use('/', indexRouter);

app.use(function(req, res, next) {
  res.status (404).json({name: 'API', version: '1.0', status: 404, message: 'not_found'});
});


module.exports = app;
