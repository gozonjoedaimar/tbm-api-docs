var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongodbConnect = require('./resources/db/connect');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const mongoose = mongodbConnect.init();

/** Route utils */
app.use(function(req, res, next) {
  req.__appdir = __dirname;
  req.__docdir = '/build/html/';
  req.__public = '/public/';
  req.db = mongoose;
  next();
})

/** load tailwind */
app.get('/vendor.css', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'resources/css/vendor.css'));
});

app.use('/',indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.locals.env = { dev: true }

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;