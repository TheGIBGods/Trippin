/**
 * Created by Guro on 20.02.2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    trips: [String], //{type: Schema.Types.ObjectId, ref: 'trip'}
});

//User.plugin(pa)

module.exports = mongoose.model('User', UserSchema);


