const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    //res.send('logging in')
    res.render('login', {user: req.user})
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('http://localhost:3000')
});

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('http://localhost:3000/calendarpage')
});

module.exports = router;