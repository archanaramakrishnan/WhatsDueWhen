const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs')

// createuser
// 409 for a user already exist status code
router.post('/createuser', (req, res) => {
    User.findOne({email: req.body.email}, async (err, user) => {
        if (err) throw err;
        if (user) res.status(409).json("User Already Exist");
        if (!user) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)

            const newUser = new User({
                email: req.body.email,
                password: hashedPassword,
                isProfessor: req.body.isProfessor
            });
            await newUser.save().then(() => res.json('User added!'))
        }
    })
})

// auth login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) {
            res.status(404).send("No User Exists");
        } else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.status(200).send("Successfully Authenticated")
                console.log(req.user)
            })
        }
    })(req, res, next);
});

// auth logout
router.get('/logout', (req, res) => {
    if (req.user != undefined){
        req.logout()
        console.log("User is logged out.")
        res.status(200).json("User logged out.")
    } else {
        console.log("You tried to log out a user when not logged in.")
    }
});

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    console.log("request", req.user)
    
    const isProfessor = req.user.isProfessor

    console.log("isProfessor", isProfessor)

    if (isProfessor == undefined) {
        res.redirect('http://localhost:3000/google/middleware')
    }

    if (isProfessor) {
        res.redirect('http://localhost:3000/calendarpageprof')
    } else {
        res.redirect('http://localhost:3000/calendarpagestudent')
    }
});

module.exports = router;