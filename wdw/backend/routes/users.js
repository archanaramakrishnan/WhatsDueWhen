const router = require('express').Router();

let User = require('../models/user.model');

// get request for .../users/ info
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// adds user to database 
router.route('/add-user').post((req, res) => {
  const body = req.body;

  const newUser = new User(body);

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  //const body = req.body;
  //const newUser = new User(body)

  //newUser.save()
  //  .then(() => res.json('User added!'))
  //  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get-user').get((req, res) => {
  userEmail = req.body.email
  console.log("looking for user" + userEmail)

  User.findOne({email: userEmail}, (err, foundUser) => {
    if (err) {
      console.log(err)
      //res.status(500).send()
    } else {
      res.json(foundUser).send()
    }
  })
});

router.route('/add-course').post((req, res) => {
  const email = req.body.email // key
  const course = req.body.course
  console.log(req.body)
  User.updateOne({email: email}, {$addToSet: {classList: course}}, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send()
    } else {
      res.json('Course added!').send()
      // console.log(result)
    }
  })

})

router.route('/remove-course').post((req, res) => {
  const email = req.body.email 
  const courseName = req.body.name
  console.log(req.body)
  User.updateOne({email: email}, {$pull: {classList: {name: courseName}}}, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
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

module.exports = router;