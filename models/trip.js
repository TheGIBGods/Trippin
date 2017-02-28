/**
 * Created by Guro on 23.02.2017.
 */
//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var TripSchema = new Schema({
    name: {type: String, required: true},
    date: Date,
    comment: String,
    users: [{type: Schema.Types.ObjectId, ref: 'user'}]
});


module.exports = mongoose.model('Trip', TripSchema);