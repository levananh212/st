const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    authId : String,
    name : String,
    email : String,
    photos : String,
    role : String
});

const User = mongoose.model('User',userSchema);

module.exports = User;