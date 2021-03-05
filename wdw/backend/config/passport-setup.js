const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')

passport.use(
    new GoogleStrategy({
        // options for strategy
        clientID: '567371174244-fv4depvnt5kli81tk6msun52hpsvvce5.apps.googleusercontent.com',
        clientSecret: 'ALuB6DdhGBHEsExFc_ElZaXP', 
        callbackURL: '/'
    }, () => {
        // passport callback function
    })
)