const express = require('express');
const cors = require('cors');
const passportSetup = require('./config/passport-setup')
const cookieSession = require('cookie-session')
const passport = require('passport')

const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['whatsduewhen']
}))

app.use(passport.initialize())
app.use(passport.session())


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const coursesRouter = require('./routes/courses');
app.use('/courses', coursesRouter);

const authRouter = require('./routes/auth-routes')
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});