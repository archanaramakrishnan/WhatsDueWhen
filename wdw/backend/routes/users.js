const router = require('express').Router();
const mongoose = require('mongoose');

let User = require('../models/user.model');
let Course = require('../models/course.model');

// get request for .../users/ info
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// adds user to database 
router.route('/add-user').post((req, res) => {
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


router.route('/add-course').post((req, res) => {
  const email = req.body.email // key
  const course = req.body.course

  User.updateOne({ email: email }, {$addToSet: {classList: course}}, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send()
    } else {
      res.json('User updated!').send()
      // console.log(result)
    }
  })

})

router.route('/remove-course').post((req, res) => {
  const email = req.body.email // key
  const courseTitle = req.body.title

  User.updateOne({email: email}, { $pull: {classList: {title: courseTitle}}}, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      res.status(200).send()
      res.json('Course removed!').send()
    }
  })
})

router.route('/courses').get((req, res) => {
  const email = req.body.email
  User.findOne({email: email}, (err, userFound) => {
    if (err) {
      res.status(500).send()
    } else {
      const classList = userFound.classList
      res.json(classList).send()
    }
  })
})


// add event(s) to a user. 
router.route('/add-events').post((req, res) => {
  const email = req.body.email
  const course = req.body.course
  const events = req.body.events  
  User.findOne({email: email}, (err, foundObject) => {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      if (!foundObject) {
        res.status(404).send()
      } else {
          foundObject[classList].
          foundObject.save()
            .then(() => res.json('User added!'))
            .catch(err => res.status(400).json('Error: ' + err));
      }
    }
  })
  // User.updateOne({ _id: id}, {classList: {course: course}},(err, result) => {
  //   if (err) {
  //     console.log(err)
  //     res.status(500).send()
  //   } else {
  //     console.log('Result', result)
  //     res.status(200).send()
  //   }
  // })
})

// get user calendar events by id
// router.route.get('/courses/:id', (req, res) => {
//     User.findByID()
// })

module.exports = router;