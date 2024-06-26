var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const playersRouter = require('./routes/Players');
const specificPlayerRouter = require('./routes/specific_Player');
const matchesRouter = require('./routes/Matches');
const specificMatchRouter = require('./routes/specific_Match');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/players', playersRouter); // Add the players router to the middleware chain
app.use('/specific_Player', specificPlayerRouter); // Add the specificPlayer router to the middleware chain
app.use('/matches', matchesRouter); // Add the matches router to the middleware chain
app.use('/specific_Match', specificMatchRouter); // Add the specificMatch router to the middleware chain

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

app.use(express.static('public', {
    setHeader: function (res, path, stat) {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

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