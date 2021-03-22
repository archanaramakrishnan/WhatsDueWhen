const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calendarEventSchema = require('./calendarEvent.model')

const courseSchema = new Schema({
  deptCode: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    unique: true
  },
  courseNumber: {
    type: Number,
    required: true,
    trim: true,
    minlength: 3,
    unique: true
  },
  courseTitle: {
    type: String,
    required: false,
    trim: true,
    minlength: 3,
    unique: true
  },
  courseDescription: {
    type: String,
    required: false,
    trim: true,
    minlength: 3,
    unique: true
  },
  permissionNumber: {
    type: Number,
    required: true,
    minlength: 3,
    unique: true
  },
  eventList: {
      type : [calendarEventSchema]
  }
}, {
  timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
// module.exports = courseSchema;


