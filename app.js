var express = require('express');
let conf = require('./config.json')
const pino = require('pino')(conf.pino)
// const expressPino = require('express-pino-logger')({ logger: pino
//     })

let logger = require('morgan')
var path = require('path');
var favicon = require('serve-favicon');

global.logger = pino
const redis = require('redis')

let session = require('express-session');
let RedisStore = require('connect-redis')(session)


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');

var app = express();
const sess = {
  store: new RedisStore(),
  secret: 'keyboard cat',
  resave: false,
  rolling: false,
  saveUninitialized: true,
  cookie: {}
}

if (app.get('env') === 'production') {
  sess.cookie.secure = true
}

app.use(session(sess));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(pino)
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/users', users);
app.use('/register', register);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
