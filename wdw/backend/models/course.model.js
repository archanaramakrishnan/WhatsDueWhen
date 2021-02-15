const mongoose = require('mongoose');
const calendarEvent = require('calendarEvent')
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  permissionNumber: {
    type: Number,
    required: true,
    minlength: 3
  },
  eventList: {
      type : [calendarEvent]
  }
}, {
  timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;