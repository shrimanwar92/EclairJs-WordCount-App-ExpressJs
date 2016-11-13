var express = require('express');
var path = require('path');
var WebSocketServer = require('ws').Server;

var index = require('./routes/index');
var users = require('./routes/users');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('port',  process.env._EJS_APP_PORT || 3000);
app.set('host',  process.env.EJS_APP_HOST || 'localhost');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

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

// Start listening for requests
var server = app.listen(app.get('port'), app.get('host'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

var wss = new WebSocketServer({
  server: server
});

wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    console.log("*******",message);
    var msg = JSON.parse(message);
    if (msg && msg.startCount) {
        startCount();
    }
  });
});

var count = require('./count.js');
function startCount() {
    var file = 'file:/data/1.txt';
    count.start(file, function(rawdata){
        // Recall raw data from EclairJS is Tuple2[] with {"0":count, "1":word}.
        // Convert to something the UI can easily use.
        //console.log("rawdata recieved from ejs: ",JSON.stringify(rawdata));
        var results = [];
        rawdata.forEach(function(result){results.push({count:result[0], word:result[1]})});
        wss.clients.forEach(function(client) {
            try {
                // Send the results to the browser
                client.send(JSON.stringify(results));
            } catch (e) {
                console.log(e);
            }
        });
    });
};

// stop spark  when we stop the node program
process.on('SIGTERM', function () {
  count.stop(function() {
    console.log('SIGTERM - stream has been stopped');
    process.exit(0);
  });
});

process.on('SIGINT', function () {
  count.stop(function() {
    console.log('SIGINT - stream has been stopped');
    process.exit(0);
  });
});

module.exports = app;

/**
 * app.js - Main Node.js Express Application Controller
 */

// Module dependencies.
/*var express = require('express'),
    pug = require('pug'),
    path = require('path')

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// Setup the application's environment.
app.set('port',  process.env._EJS_APP_PORT || 3000);
app.set('host',  process.env.EJS_APP_HOST || 'localhost');
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

// Route all GET requests to our public static index.html page
app.use('/', index);
app.use('/users', users);

// Start listening for requests
var server = app.listen(app.get('port'), app.get('host'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});*/
