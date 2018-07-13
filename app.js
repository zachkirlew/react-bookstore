const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const httpProxy = require('http-proxy');

const app = express();

//Proxy to API
const apiProxy = httpProxy.createProxyServer({
  target: 'http://localhost:5000'
});

app.use('/api', function(req,res){
  apiProxy.web(req,res);
});

//End Proxy

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

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
