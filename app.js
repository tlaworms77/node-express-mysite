var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');

var mainRouter = require('./routes/main');
var userRouter = require('./routes/user');
var apiRouter = require('./routes/api');

var app = express();

//basic favicon
app.use(favicon(path.join(__dirname, 'public', 'assets', 'images', 'favicon.ico')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json()); // json을 form데이터로 받는 것.(응답)
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Session Env..
app.use(session({
    // Options
    secret: "mysite-session",
    resave: true, // 무조건 세션을 만든다는 의미.
    saveUninitialized: true
}));

// session 및 렌더링 작업시 모든 요청에 따른 효과 적용 req값을 넣기 위해
// 공유할 변수가 있을 시 사용한다.!!!
app.all('*', function (req, res, next) {
   res.locals.req = req;
    res.locals.res = res;
    // 멈추면 안흘러가기 떄문에 next가 꼭 필요!!
    next();
});

app.use('/', mainRouter);
app.use('/user', userRouter);
app.use('/api', apiRouter);

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
