const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
email: { type: String, required: true, index: { unique: true } },
password: { type: String, required: true },
fname:{type:String, required:true},
lname:{type:String, required:true},
});


module.exports = mongoose.model('User', User);