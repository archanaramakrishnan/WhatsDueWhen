const mongoose = require('mongoose');
const courseSchema = require('./course.model')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  firstname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  lastname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  isProfessor: {
    type: Boolean,
    required: true
  },
  classList: {
    type: [courseSchema]
}
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;