var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var expressLayouts = require('express-ejs-layouts');

var sessionController = require('./utils/session');

var homeRouter = require('./routes/home');
var boardRouter = require('./routes/board');
var clubRouter = require('./routes/club');
var machingRouter = require('./routes/maching');
var userRouter = require('./routes/user');
var test = require('./test');
var groupRouter = require('./routes/group');
//var usersRouter = require('./routes/users');

var app = express();

var mysession = session({ // setting session
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
});
//global.DB = require('./utils/db').getInstace(); //만약 DB가 있다면 주석처리 제거해도 됩니다. 

//DB.makeTable("User","user",["id","pw","name","school_name","email"]) //만약 DB가 있다면 주석처리 제거해도 됩니다.

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set("mysession",mysession);
app.set("layout extractScripts", true);
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(mysession); // use session.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(sessionController);

app.use('/', homeRouter);
app.use('/board', boardRouter);
app.use('/club', clubRouter);
app.use('/maching', machingRouter);
app.use('/user',userRouter);
app.use('/test',test);
app.use('/group',groupRouter); 

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
