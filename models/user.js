const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fbId : String,
    name : String,
    photo : String,
    role : String
});

const User = mongoose.model('User',userSchema);

module.exports = User;