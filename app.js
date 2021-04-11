var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//import the router manager
const routers = require('./routers/index.js')
//create the app instance
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//set the built-in middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}))

app.use(cookieParser({
  extended: false
}))
app.use(logger('dev'))


//set the static resourse path
app.use(express.static(path.join(__dirname, 'public')));

//set the cross orgin middleware
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);
  else
    next();
})

//set the routers
app.use('/', routers.rootRouter);
app.use('/user', routers.userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;