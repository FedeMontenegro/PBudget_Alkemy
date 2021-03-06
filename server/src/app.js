var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const methodOverride = require("method-override");
const cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//Apis
const apiUserRouter = require("./routes/APIs/apiUserRouter");
const apiOperationRouter = require("./routes/APIs/apiOperationRouter");
const apiCategoryRouter = require("./routes/APIs/apiCategoryRouter");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));
app.use(session({
  secret: "mySecret",
  resave: false,
  saveUninitialized: true
}));

//Cors
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/api/users", apiUserRouter);
app.use("/api/operations", apiOperationRouter);
app.use("/api/categories", apiCategoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
