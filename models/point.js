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
        enum: ['restaurant', 'hotel', 'attraction', 'shopping', 'other']},
    comment: String,
    created_by: {type: Schema.Types.ObjectId, ref: 'User'},
    point_ID: Schema.Types.ObjectId
});


module.exports = mongoose.model('Point', PointSchema);