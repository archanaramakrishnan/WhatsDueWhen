const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/user.model')

passport.use(
    new GoogleStrategy({
        // options for strategy
        callbackURL: '/auth/google/redirect',
        clientID: '567371174244-fv4depvnt5kli81tk6msun52hpsvvce5.apps.googleusercontent.com',
        clientSecret: 'ALuB6DdhGBHEsExFc_ElZaXP'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('passport callback function fired:');
        console.log(profile.emails[0].value);
        const googleEmail = profile.emails[0].value

        User.findOne({email: googleEmail}, (err, foundUser) => {
            if (err) {
                return done(err, foundUser)
            }

            if (foundUser) {
                // already have this user
                console.log('user is: ', foundUser);
                // done(null, foundUser);
            } else {
                const newUser = new User({
                    firstname: profile.name.givenName,
                    lastname: profile.name.familyName,
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    isProfessor: true
                })

                newUser.save().then(() => {
                    console.log('created new user: ', newUser)
                    // done(null, newUser)
                })

            }
            console.log('done')
        })

    })
)