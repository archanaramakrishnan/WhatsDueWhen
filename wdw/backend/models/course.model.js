const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calendarEventSchema = require('./calendarEvent.model')

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
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


