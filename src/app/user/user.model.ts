var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum : ["normal", "contributor"],
        required: true,
        default: "normal"
    },
    status: {
        type: Boolean,
        default: true
    },
    createdOn: {
        type: Date
    },
    updatedOn: {
        type: Date
    }
})

var userModel = mongoose.model('User', UserSchema);
module.exports = userModel