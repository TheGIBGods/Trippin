var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
//lag en variabel som viser til modelfilen
var users = require('./models/user');
var userByUsername = require('./models/user');
var userByID= require('./models/user');
var trip = require('./models/trip');
var tripOnId = require('./models/trip');
var point = require('./models/point');
var mongoose = require('mongoose');

var app = express();


//Connecting to the database using mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://heroku_xdbrx3qp:p4dspfmv2cqsdr3pirskqie5sr@ds157839.mlab.com:57839/heroku_xdbrx3qp');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});


//var routes = require('./routes/api.js');
var router = express.Router();

//hent dataen fra dataasen
router.get('/users', function (req, res) {
    console.log('in users method');
    var response = {};
    users.find({}, function (err, data) {
     response = {"message": data};
     //console.log('response from db is:');
     //console.log(data);
     res.json(response);
     });
});



/*
router.get('/usersByUsername', function (req, res) {
    console.log('in users method');
    var response = {};
    users.find({username: userName}, function (err, data) {
        response = {"message": data};
        console.log('response from db is:');
        console.log(data);
        res.json(response);
    });
});

router.get('/usersByID', function (req, res) {
    console.log('in users method');
    var response = {};
    users.find({_id: userID}, function (err, data) {
        response = {"message": data};
        console.log('response from db is:');
        console.log(data);
        res.json(response);
    });
});
*/


router.get('/trip', function (req, res) {
    console.log('in trip method');
    var response = {};
    trip.find({}, function (err, data) {
        response = {"message": data};
        //console.log('response from db is:');
        //console.log(data);
        res.json(response);
    });
});

router.get('/tripOnId', function (req, res) {
    console.log('in tripOnId method');
    var tripID = req.query.id;
    console.log("TripID in app: " + tripID);
    var response = {};
    trip.find({_id: tripID}, function (err, data) {
        response = {"message": data};
        console.log('response from db is:');
        console.log(data);
        res.json(response);
    });
});

router.get('/point', function (req, res) {
    console.log('in point method');{

    }
    var response = {};
    point.find({}, function (err, data) {
        response = {"message": data};
        //console.log('response from db is:');
        //console.log(data);
        res.json(response);
    });
});

router.post('/savePoint', function(req, res){
    var newPoint = new point(req.body);
    var Point = newPoint.save(function(err, point)  {
            if (err) return console.error(err);
            else console.log("signIn success")
        }
    )
    console.log("in savePoint");
    return Point;
});

router.post('/saveUser', function(req, res){
    var newUser = new users(req.body);
    newUser.save(function(err, user)  {
            if (err) return console.error(err);
            else console.log("user registration success")
        }
    )
    console.log("in savePoint");
});

router.post('/addTripToUser', function (req, res){
    var tripID = req.body.tripID;
    var userID = req.body.userID;
    console.log('tripID and User ID: ' + tripID + ', '+ userID);

    users.findByIdAndUpdate(
        userID,
        {$push: {trips: tripID} },
        {safe: true, upsert: true},
        function(err, model) {
            if(err) return handleError(err);
        }
    );
});

router.post('/createTrip', function(req, res){
    var newTrip = new trip(req.body);
    newTrip.save(function(err, point)  {
            if (err) return console.error(err);
            else console.log("user registration success")
        }
    )
    console.log("in createTrip");
});

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
//app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));

//setter tilgang til filer
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname + '/node_modules')));
app.use('/', index);
//app.use("/views", express.static(__dirname+"/views"));

//app.use('/users', users);

/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
*/

/*// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/

app.use('/', router);
module.exports = app;
