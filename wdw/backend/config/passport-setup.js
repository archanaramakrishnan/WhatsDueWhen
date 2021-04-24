const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcryptjs");

const User = require('../models/user.model')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

// Google Startegy
passport.use(
    new GoogleStrategy({
        // options for strategy
        callbackURL: '/auth/google/redirect',
        clientID: '567371174244-fv4depvnt5kli81tk6msun52hpsvvce5.apps.googleusercontent.com',
        clientSecret: 'ALuB6DdhGBHEsExFc_ElZaXP',
        passReqToCallback: true
    }, (req, accessToken, refreshToken, profile, done) => {
       console.log('req', req)
       User.findOne({email: profile.emails[0].value}).then((foundUser) => {
        if(foundUser)
        {
            console.log('found existing user!')
            done(null, foundUser);
        }
        else
        {
            console.log('could not find user: ', profile)
            new User({
                firstname: profile.name.givenName,
                lastname: profile.name.familyName,
                googleId: profile.id,
                email: profile.emails[0].value,
                //isProfessor: true
            }).save().then((newUser) => {
                done(null, newUser);
            });
        }
       })
    })
)

// Local Strategy
passport.use(
    new LocalStrategy({usernameField: "email", passReqToCallback: true,}, (req, email, password, done) => {
        User.findOne({email: email}, (err, user) => {
            if (err) throw err;
            if (!user) return done(null, false);
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) throw err;
                if (result === true) {
                    return done(null, user);
                } else {
                  return done(null, false);
                }
            })
        });
    })
)