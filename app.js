require('babel-core/register')({
  "presets": ["es2015", "react", "stage-1"]
});

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const httpProxy = require('http-proxy');

const index = require('./routes/index');
const Books = require('./models/books.js');
const proxyPort = require('./apiServer');
const requestHandler = require('./requestHandler');

const app = express();

// Proxy to API
const apiProxy = httpProxy.createProxyServer({
  target: `http://localhost:${proxyPort}`
});
app.use('/api', function(req, res) {
  apiProxy.web(req, res);
});
// End proxy to API

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.use(requestHandler);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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
