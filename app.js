var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var i18n = require('./config/i18n');
var i18n = require('i18n');
var nodemailer = require('nodemailer');

var routes = require('./routes/index');
var users = require('./routes/user');

// i18n configure
i18n.configure({
    locales: ['en', 'el'],
    cookie: 'locale',
    directory: __dirname + '/config/locales'
});

// Create a SMTP transport object
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'kostas.siabanis@gmail.com',
        pass: 'V0snidou1Mar1a'
    }
});

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(i18n.init);

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;


//http://www.livelythinking.com/2014/01/creating-feedback-form-in-nodejs-app.html
