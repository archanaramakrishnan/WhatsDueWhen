const express = require('express');
// const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);
const cors = require('cors');
const passportSetup = require('./config/passport-setup')
const cookieSession = require('cookie-session')
const passport = require('passport')

const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['whatsduewhen']
}))

// app.use(
//   session({
//       secret: "very secret this is",
//       resave: false,
//       saveUninitialized: true,
//       // store: new MongoStore({ mongooseConnection: mongoose.connection })
//   })
// );

app.use(passport.initialize())
app.use(passport.session())


const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const coursesRouter = require('./routes/courses');
app.use('/courses', coursesRouter);

const authRouter = require('./routes/auth-routes')
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});