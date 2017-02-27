/**
 * Created by Guro on 20.02.2017.
 */

var User = require('../models/user.js');
var express = require("express");
var router = express.Router();


console.log('Kjører api fil');


router.get("/", function(req, res){

   res.json({"error":false, "message":"Hello world"});
});

/*router.get("/users", function (req, res) {
    console.log('in users method');
    var response = {};
    User.find({}, function (err, data) {
        response = {"message": data};
        console.log('response from db is:');
        console.log(data);
        res.json(response);
    });
});*/



/*testuser.save(function (err) {
    if(err){
        console.log(err);
    }else{
        console.log('SAVED')
    }
});*/


