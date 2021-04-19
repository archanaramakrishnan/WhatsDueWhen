const router = require('express').Router();

let Course = require('../models/course.model');
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

router.route('/good').get((req, res) => {
  res.status(200).send([{
    title: 'Website Re-Design Plan',
    startDate: '2021-04-17T09:45',
    endDate: '2021-04-17T11:00',
    id: 0,
    class: "EECS 268"
  }])
})

router.route('/events').get((req, res) => {
  const classList = req.user.classList
  console.log("classlist", classList)

  Course.find()
    .then(doc => {
      if (doc != []) {
        let eventList = []
        for (let i = 0; i < classList.length; i++) {
          for (let k = 0; k < doc.length; k++) {
            if ( (classList[i].deptCode === doc[k].deptCode) && (classList[i].courseNumber === doc[k].courseNumber) ) {
              console.log("doc[k]", doc[k])
              eventList = [...eventList, ...doc[k].eventList]
            } 
          }
        }
        // console.log("eventList", eventList)
        res.status(200).send(eventList)
      } else {
        res.status(400).send()
      }
    })
    .catch(err => {
      console.log(err);
    });

  // const courseList = req.user.classList
  // let eventList = []
  // console.log('[users.js 117]: courseList: ' + JSON.stringify(courseList))

  // //for(course in courseList)
  // for(let i = 0; i < courseList.length; ++i)
  // {
  //   if(courseList[i] != null)
  //   {
  //     await Course.findOne({deptCode: courseList[i].deptCode, courseNumber: courseList[i].courseNumber}, (err, course) => {
  //       console.log('[users.js 121] course :' + JSON.stringify(course))
  //       console.log('[users.js 122] deptCode :' + course.deptCode)
  //       console.log('[users.js 123] courseNumber :' + course.courseNumber)
  //       console.log('[users.js 125] event :' + course.eventList)

  //       for(let i = 0; i < course.eventList.length; ++i)
  //       {
  //         eventList.push(course.eventList[i])
  //       }
  //     })
  //   }
  // }

  // console.log('[users.js 134] returned event list :' + eventList)
  // res.json(eventList)
});

router.route('/new-event').post((req, res) => {

});

router.route('/update-event').post((req, res) => {

});

router.route('/delete-event').post((req, res) => {

});

module.exports = router;