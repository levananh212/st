const User = require('../models/user.js');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../credentials.js');

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
        profileFields : ['id','displayName','photos','email']
    },
    (accessToken,refeshToken,profile,done) => {
        User.findOne({authId : profile.id} , (err,user) => {
            if (err) return done(err,null);
            if (user) return done(null,user);
            user = new User({
                authId : profile.id,
                name : profile.displayName,
                email : profile.email,
                photos : profile.photos,
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