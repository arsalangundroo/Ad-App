var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var querystring = require('querystring');
var http = require('http');
var defaultRoutes = require('./routes/index');
var users = require('./routes/users');
var sellerRoutes = require('./routes/sellerRoutes.js');
var customerRoutes = require('./routes/customerRoutes.js');
var imageUploadRoute = require('./routes/imageUploadRoute.js');
var app = express();

//DB Setup
//Todo: Set the DB details in config file
var dbName = 'advertisementDB';
var connectionString = 'mongodb://localhost:27017/' + dbName;
mongoose.connect(connectionString);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


sellerRoutes.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    var requestData = {
      "token": token,
      "user_role": "seller"
    };
    request({
      url: "http://localhost:3300/access_authentication/",
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(requestData)
    }, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body)
        if (body.authentication && body.authentication.valid === true) {
          req.body.accountId = body.authentication.accountId;
          console.log("Authenticated!!!!!!!!!!!!");
          next();
        } else {
          res.status(403);
          res.send({
            message: "Invalid Access!!"
          });
        }
      } else {
        console.log("error: " + error);
        console.log("response.statusCode: " + response.statusCode);
        console.log("response.statusText: " + response.statusText);
        return res.status(403).send({
          success: false,
          message: 'Could not authenticate the request.'
        });
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

customerRoutes.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    var requestData = {
      "token": token,
      "user_role": "customer"
    };
    request({
      url: "http://localhost:3300/access_authentication/",
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(requestData)
    }, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body)
        if (body.authenticity && body.authenticity === true) {
          next();
        } else {
          res.status(403);
          res.send({
            message: "Invalid Access!!"
          });
        }
      } else {
        console.log("error: " + error);
        console.log("response.statusCode: " + response.statusCode);
        console.log("response.statusText: " + response.statusText);
        return res.status(403).send({
          success: false,
          message: 'Could not authenticate the request.'
        });
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});


app.use('/', defaultRoutes);
app.use('/users', users);
app.use('/seller', sellerRoutes);
app.use('/customer', customerRoutes);
app.use('/adImages', imageUploadRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// app.listen(3030,function(){
//   console.log('Server started');
// });

module.exports = app;