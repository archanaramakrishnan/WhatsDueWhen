const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    //required: true,
    //trim: true,
    //minlength: 3
  },
  lastname: {
    type: String,
    //required: true,
    trim: true,
    //minlength: 3
  },
  email: {
    type: String,
    //required: true,
    unique: true
  },
  password: {
    type: String,
<<<<<<< HEAD
    //required: true,
    //minlength: 6
=======
    minlength: 6
>>>>>>> login-integration
  },
  isProfessor: {
    type: Boolean,
    //required: true
  },
  classList: {
    type: [
      {
        name: {
<<<<<<< HEAD
          type: String,
          unique: true,
          sparse: true
=======
          type: String
>>>>>>> login-integration
        }
      }
    ]
}
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;