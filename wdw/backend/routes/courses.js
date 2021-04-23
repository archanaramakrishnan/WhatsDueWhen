const router = require('express').Router();

let Course = require('../models/course.model');

// get request for .../courses/ info
router.route('/').get((req, res) => {
  Course.find()
    .then(courses => res.json(courses))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const body = req.body;
  // console.log(body);
  const newCourse = new Course(body);

  Course.findOne({deptCode: body.deptCode, courseNumber: body.courseNumber}, (err, foundCourse) => {
    if (err) {
      console.log(err)
      res.status(400).json('Error: ' + err)
    } else if (foundCourse) { 
      console.log("Found a Course")
      res.status(422).json('Error: Duplicate Course Found').send()
    } else {
      console.log("No course found")
      newCourse.save()
        .then(() => res.json('Course added!'))
        .catch((err) => {
          console.log(err)
          res.status(400).json('Error: ' + err)
      })
    }
  })
})

router.route('/add-event').post((req, res) => {
  const event = req.body
  const classInfo = req.body.class.split(' ')
  const deptCode = classInfo[0]
  const courseNumber = parseInt(classInfo[1])

  const update = {$addToSet: {eventList: event}}

  Course.updateOne( { $and: [{deptCode: deptCode}, {courseNumber: courseNumber}] }, update, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
        console.log('Event Added')
        res.json('Event Added')
    }
  });
    
});

router.route('/delete-event').post((req, res) => {
  // const deptCode = res.body.deptCode
  // const courseNumber = res.body.courseNumber
  console.log(req.body)
  console.log(req.body._id)
  const classInfo = req.body.class.split(' ')
  const deptCode = classInfo[0]
  const courseNumber = parseInt(classInfo[1])

  Course.updateOne({ $and: [{deptCode: deptCode}, {courseNumber: courseNumber}] }, {$pull: {eventList: {_id: req.body._id} }}, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      console.log("Event removed!")
      res.json("Event removed!")
    }
  })
})

// get user calendar events
router.route('/calendar-events').get((req, res) => {
  const name = req.body.name
  console.log(req.body)
  Course.findOne({name: name}, (err, foundCourse) => {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      res.json(foundCourse.eventList)//.send()
    }
  })
})


router.route('/update-event').post((req, res) => {
  const course = req.body.course
  const eventTitle = req.body.title

  Course.updateOne({ $and: [{deptCode: course.deptCode}, {courseNumber: course.courseNumber}] }, {$: {eventList: {title: eventTitle}}})
});



module.exports = router;