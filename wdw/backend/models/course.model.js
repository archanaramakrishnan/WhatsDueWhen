const mongoose = require('mongoose');
const calendarEventSchema = require('./calendarEvent.model')
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  permissionNumber: {
    type: Number,
    required: true,
    minlength: 3
  },
  eventList: {
      type : [calendarEventSchema]
  }
}, {
  timestamps: true,
});

const courseModel = mongoose.model('Course', courseSchema);

module.exports = courseModel;
module.exports = courseSchema;


