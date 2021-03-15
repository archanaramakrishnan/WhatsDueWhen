const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const calendarEventSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    unique: true
  },
  startDate: {
    type: Date,
    //required: true
  },
  endDate: {
    type: Date,
    //required: true
  }
}, {
  timestamps: true,
});

// const calendarEvent = mongoose.model('calendarEvent', calendarEventSchema);

// module.exports = calendarEvent;
module.exports = calendarEventSchema;