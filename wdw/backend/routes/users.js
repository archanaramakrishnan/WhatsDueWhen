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
});

router.route('/get-user').get((req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // res.setHeader('Access-Control-Allow-Credentials',true);
  
  const user = req.user
  console.log("getuser", user)

  if (user != undefined) {
    res.status(200).json(user).send()
  } else {
    res.status(400).send()
  }

  // userEmail = req.body.email
  // console.log("looking for user" + userEmail)

  // User.findOne({email: userEmail}, (err, foundUser) => {
  //   if (err) {
  //     console.log(err)
  //     //res.status(500).send()
  //   } else {
  //     res.json(foundUser).send()
  //   }
  // })
});

router.route('/isProfessor').get((req, res) => {
  const user = req.user
  if (user.isProfessor) {
    res.status(200).json(true).send()
  } else {
    res.status(200).json(false).send()
  }
})

router.route('/add-course').post((req, res) => {
  const user = req.user;
  const course = req.body;
  
  User.updateOne({email: user.email}, {$addToSet: {classList: course}}, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send()
    } else {
      res.json('Course added!').send()
      // console.log(result)
    }
  });

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
  const user = req.user;
  if (user != undefined) {
    res.status(200).json(user.classList).send()
  } else {
    res.status(404).send();
  }
});

// req: {email: (users email)}
// res: true or false or 500 error code 
router.route('/user-exist').post((req, res) => {
  const userEmail = req.body.email
  User.findOne({email: userEmail}, (err, user) => {
    if (err) {
      res.status(400).send()
    }

    if (user) {
      res.status(200).json(true).send()
    } else {
      res.status(200).json(false).send()
    }
  })
})

module.exports = router;