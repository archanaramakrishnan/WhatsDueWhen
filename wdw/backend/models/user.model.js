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
<<<<<<< HEAD
    required: true,
=======
>>>>>>> 5659ddf4217cff187100992026a825fa008ec413
    minlength: 6
  },
  isProfessor: {
    type: Boolean,
    required: true
  },
<<<<<<< HEAD
=======
  googleId: {
    type: String
  },
>>>>>>> 5659ddf4217cff187100992026a825fa008ec413
  classList: {
    type: [
      {
        name: {
<<<<<<< HEAD
          type: String,
          unique: true
=======
          type: String
>>>>>>> 5659ddf4217cff187100992026a825fa008ec413
        }
      }
    ]
}
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;