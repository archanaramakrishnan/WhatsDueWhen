const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 6
  },
  isProfessor: {
    type: Boolean,
    required: true
  },
  classList: {
    type: [
      {
        name: {
          type: String
        }
      }
    ]
}
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;