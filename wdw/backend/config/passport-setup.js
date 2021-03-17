const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/user.model')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for strategy
        callbackURL: '/auth/google/redirect',
        clientID: '567371174244-fv4depvnt5kli81tk6msun52hpsvvce5.apps.googleusercontent.com',
        clientSecret: 'ALuB6DdhGBHEsExFc_ElZaXP'
    }, (accessToken, refreshToken, profile, done) => {
       User.findOne({googleId: profile.id}).then((foundUser) => {
        if(foundUser)
        {
            done(null, foundUser);
        }
        else
        {
            new User({
                firstname: profile.name.givenName,
                lastname: profile.name.familyName,
                googleId: profile.id,
                email: profile.emails[0].value,
                isProfessor: true
            }).save().then((newUser) => {
                done(null, newUser);
            });
        }
       })
    })
)