const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const calendarEventSchema = new Schema({
  id: {
    type: Number
  },
  title: {
    type: String,
    //required: true,
    //trim: true,
    //minlength: 3,
    //unique: true
  },
  startDate: {
    type: String,
    //required: true
  },
  endDate: {
    type: String,
    //required: true
  },
  notes: {
    type: String
  },
  allDay: {
    type: Boolean
  }
}, {
  timestamps: true,
});

// const calendarEvent = mongoose.model('calendarEvent', calendarEventSchema);

// module.exports = calendarEvent;
module.exports = calendarEventSchema;
