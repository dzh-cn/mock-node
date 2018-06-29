var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var mockRouter = require('./routes/mock');
var projectRouter = require('./routes/project');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');

app.use('/', indexRouter);
app.use('/mock', mockRouter);
app.use('/project', projectRouter);

module.exports = app;
