/**
 * Created by Guro on 20.02.2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String
});

//User.plugin(pa)

module.exports = mongoose.model('users', User);


