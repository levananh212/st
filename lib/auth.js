const User = require('../models/user.js');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config.js');

passport.serializeUser((user,done) => done(null,user._id));

passport.deserializeUser((id,done) => {
    User.findById(id,(err,user) => {
        if (err || !user) return done(err,null);
        done(null,user);
    } );
});

passport.use(new FacebookStrategy({
        clientID : config.facebook.appId,
        clientSecret : config.facebook.appSecret,
        callbackURL : config.facebook.callbackURL,
        profileFields : ['id','displayName','photos']
    },
    (accessToken,refeshToken,profile,done) => {
        User.findOne({fbId : profile.id} , (err,user) => {
            if (err) return done(err,null);
            if (user) return done(null,user);
            user = new User({
                fbId : profile.id,
                name : profile.displayName,
                photo : profile.photos[0].value,
                role : 'customer'
            });
            user.save( err => {
                if (err) return done(err,null);
                done(null,user);
            })
        });
    }
));

module.exports = passport;