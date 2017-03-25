var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
//lag en variabel som viser til modelfilen
var users = require('./models/user');
var trips = require('./models/trip');
var points = require('./models/point');
var mongoose = require('mongoose');
var moment = require('moment');

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

//controllers for user
//all users
router.route('/users')
    /*.get( function (req, res) {
        console.log('in users method');
        var response = {};
        users.find({}, function (err, data) {
            if(err)
                console.log("couldn't find users");
                res.send(err);
            response = {"message": data};
            //res.json(response);
        });
    })*/

    .post( function(req, res){
        var newUser = new users(req.body);
        console.log("in savePoint");
        newUser.save(function(err, user)  {
            if (err) return console.error(err);
            else console.log("user registration success");
        });
    });

//one user
router.route('/users/:name')
    .get( function (req, res) {
        var userName = req.params.name;
        var response = {};
        users.find({username: userName}, function (err, data) {
            if(err) {
                console.log("This user does not exist");
                res.send(err);
            }
            response = {"message": data};
            res.json(response);
        });
    });

//controllers for trips
//all trips
router.route('/trips')
    .get( function (req, res) {
        console.log("In trips.get");
        var response = {};
        trips.find({}, function (err, data) {
            console.log("finding trips");
            if(err) {
                console.log("couldn't get all trips");
                res.send(err);
            }

            response = {"message": data};
            res.json(response);
        });
    })

    .post( function(req, res){
        var newTrip = new trips(req.body);
        newTrip.save(function(err, point)  {
            if (err) return console.error(err);
            else console.log("user registration success")
        });
    });

//one trip
router.route('/trips/:id')
    .get( function (req, res) {
        var tripID = req.params.id;
        var response = {};
        trips.find({_id: tripID}, function (err, data) {
            if(err) {
                console.log("Couldn't find trip");
                res.send(err);
            }

            response = {"message": data};
            res.json(response);
        });
    });

//controllers for point
//all points
router.route('/points')
    .get( function (req, res) {
        console.log('in point.get');
        var response = {};
        points.find({}, function (err, data) {
            if(err) {
                console.log("error in get all points");
                res.send(err);
            }

            response = {"message": data};
            res.json(response);
        }).sort({'name': 1});
    })

    .post( function(req, res){
        var newPoint = new points(req.body);
        var Point = newPoint.save(function(err, point)  {
            if (err) return console.error(err);
            else console.log("signIn success")
        });
        return Point;
    });

//one point
router.route('/points/:id')
    .get( function (req, res) {
        console.log('in point method');
        //var response = {};
        points.find({trip_ID: req.params.id}, function (err, data) {
            if(err) {
                console.log("couldn't find point for this trip id");
                res.send(err);
            }

            res.json(data);
        });
    })

    .delete(function (req,res) {
        console.log(" in point delete");
        points.remove({
            _id: req.params.id
        }, function (err, point) {
            if(err)
                res.send(err);

            res.json({message:'Successfully deleted'});
        });
    });

//controllers for arrays
//save tripID to user
router.route('/users/:name/:tripID')
    .put( function(req, res){
    users.update({username: req.params.name}, {$push: {'trips': {'tripName': req.params.tripID}}}, function(err, data){
        if (err) {
            console.log("couldn't find user or save tripID");
            res.send(err);
        }
        });
    });

//save username to trip
router.route('trip/:tripID/:userName')
    .post( function (req, res){
        var tripID = req.body.tripID;
        var userID = req.body.userID;
        console.log('tripID and User ID: ' + tripID + ', '+ userName);

        trips.findByIdAndUpdate(function(err, model) {
                if(err) return handleError(err);
            });
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
