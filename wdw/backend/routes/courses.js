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
  const courseName = req.body.courseName
  const event = req.body.event 
  Course.updateOne({name: courseName}, {$addToSet: {eventList: event}}, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
        console.log('Event Added')
        res.json('Event Added')
    }
  })
    
})

router.route('/remove-event').post((req, res) => {
  const courseName = req.body.courseName
  const eventTitle = req.body.title
  console.log(req.body)
  Course.updateOne({name: courseName}, {$pull: {eventList: {title: eventTitle}}}, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
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
      res.json(foundCourse.eventList).send()
    }
  })
})
  
module.exports = router;