/**
 * Created by Guro on 23.02.2017.
 */
//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var TripSchema = new Schema({
    name: {type: String, required: true},
    fromdate: String,
    todate: String,
    comment: String,
    imglink: {type: String, default: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Globe_centered_in_the_Atlantic_Ocean_(green_and_grey_globe_scheme).svg/2000px-Globe_centered_in_the_Atlantic_Ocean_(green_and_grey_globe_scheme).svg.png"},
    users: [{userName: {type: String}}]
});


module.exports = mongoose.model('Trip', TripSchema);