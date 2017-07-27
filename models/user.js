const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fbId : String,
    name : String,
    email : String,
    photos : String,
    role : String
});

const User = mongoose.model('User',userSchema);

module.exports = User;