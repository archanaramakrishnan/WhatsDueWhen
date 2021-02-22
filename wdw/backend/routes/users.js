const router = require('express').Router();

let User = require('../models/user.model');
let courseModel = require('../models/course.model');

// get request for .../users/ info
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// adds user to database 
router.route('/addUser').post((req, res) => {
  // const username = req.body.username;
  // const email = req.body.email;
  // const password = req.body.password;
  // const newUser = new User({username: username, email: email, password: password});
  const body = req.body;
  const newUser = new User(body)

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addCourse').post((req, res) => {
  const email = req.body.userEmail
  const course = req.body.monkey
  // const newCourse = new courseModel(course)
  const user = User.find({email: email})

  if (user.email == email)
  {
    console.log("Yes")
  }

  console.log(email)
  console.log(course)
  // console.log(user)

  res.status(200)

  // check if user exist

  // newCourse.save()
  //   .then(() => res.json('Course added!'))
  //   .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;