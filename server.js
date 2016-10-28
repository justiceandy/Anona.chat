var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var sessions = require('client-sessions');
var fs = require('fs');

var authenticationRoutes = require('./api/routes/authenticate');
var roomRoutes = require('./api/routes/rooms');
var userRoutes = require('./api/routes/user');
var messageRoutes = require('./api/routes/messages');

// App Settings
var config = require('./api/settings');

// Initialize Express
var app = express();

// Load Models
//fs.readdirSync(__dirname + '/api/models').forEach(function(filename){
//  if(~filename.indexOf('.js')) require(__dirname + '/api/models/' + filename);
//});

// Default Modules
app.use(logger('dev'));
// Body Parser
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(bodyParser.json({limit: '50mb', extended: false}));
// Cookie Parser
app.use(cookieParser());
// Serve /app directory for front End
app.use(express.static(path.join(__dirname, 'app')));
// View Engine {Jade} Primarily for Errors, Internal
app.set('view engine', config.renderEngine);
// View Engine Templates {Jade}
app.set('views', __dirname + config.views);
// Add Favicon
app.use(favicon(__dirname + config.favicon));

// Load Routes
app.use('/', authenticationRoutes);
app.use('/', roomRoutes);
app.use('/', messageRoutes);
app.use('/', userRoutes);
// Defaults for sending non valid routes to index.html
// These are catch route
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});
app.get('/:a', function(req, res) {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});
app.get('/:a/:b', function(req, res) {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});
app.get('/:a/:b/:c', function(req, res) {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});
app.get('/:a/:b/:c/:d', function(req, res) {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

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

module.exports = app;

app.listen(config.port, function() {
  console.log('Anona.chat Loaded on:', config.port);
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});
