// BASE SETUP
// =============================================================================

// call the packages we need
var http       = require('http');
var path       = require('path');
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var socketio   = require('socket.io');

var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST

// function to call if you are not from localhost
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "https://preview.c9users.io");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// ----------------------------------------------------
router.route('/').post(function(req, res) {
    res.json({ message: 'Hello World!' });
});

// REGISTER OUR ROUTES -------------------------------
app.use(express.static(path.resolve(__dirname, 'client')));

// START THE SERVER
// =============================================================================
var server = app.listen(process.env.PORT || 3000);
var io     = require('socket.io').listen(server);

// Add a connect listener
io.on('connection', function(socket) {

    console.log('Client connected.');
    // socket.emit('conversations', facebook.getConversations());

    // Disconnect listener
    socket.on('disconnect', function() {
        console.log('Client disconnected.');
    });
});