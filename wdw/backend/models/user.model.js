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
    //required: true,
    //minlength: 6
  },
  isProfessor: {
    type: Boolean,
    //required: true
  },
  googleId: {
    type: Number
  },
  authProvider: {
    type: String
  },
  classList: {
    type: [
      {
        deptCode: {
          type: String,
          unique: true,
          sparse: true
        },
        courseNumber: {
          type: String,
          unique: true,
          sparse: true
        },
        courseTitle: {
          type: String,
          unique: true,
          sparse: true
        }, 
        permissionNumber: {
          type: Number
        }
      }
    ]

}
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;