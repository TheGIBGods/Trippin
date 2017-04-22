//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var PointSchema = new Schema({
    x_koord: {type: Number, required: true},
    y_koord: {type: Number, required: true},
    name: {type: String, required: true},
    category: {
        type: String,
        enum: ['restaurant', 'hotel', 'attraction', 'shopping', 'other', 'transportation', 'activity'], //enum means category can only be one of these
        //Lagt inn litt ekstra i listen her foreløping, må legges til flere steder
        required: true
    },
    comment: String,
    date: String,
    date2: String,
    address: String,
    website: String,
    created_by: String,//{type: Schema.Types.ObjectId, ref: 'User'}, //"ForeignKey" to a user-document
    trip_ID: String//{type: Schema.Types.ObjectId, ref: 'Trip'} //"ForeignKey" to a trip-document
});

module.exports = mongoose.model('Point', PointSchema);