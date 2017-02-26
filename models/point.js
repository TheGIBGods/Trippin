//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var PointSchema = new Schema({
    x_koord: {type: Number, required: true},
    y_koord: {type: Number, required: true},
    name: {type: String, required: true},
    category: {
        type: String,
        enum: ['restaurant', 'hotel', 'attraction', 'shopping', 'other'],
        required: true
    },
    comment: String,
    created_by: {type: Schema.Types.ObjectId, ref: 'User'},
    date: Date,
    trip_ID: {type: Schema.Types.ObjectId, ref: 'Trip'}
});


module.exports = mongoose.model('Point', PointSchema);