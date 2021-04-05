import React, {useState, useEffect } from 'react';
import './CalendarPage.css';
// import Calendar from './Calendar';
import Calendar from './Calendar';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import SubjectSelector from './SubjectSelector';
import { BrowserRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//For contecting to our backend
import axios from 'axios';

const generateRandomInt = () => {
  let min = 100000;
  let max = 999999;
  let randNumber = Math.random() * (max - min) + min;
  let intRand = Math.floor(randNumber);
  return(intRand);
}

export const CalendarPage = () => {
  //handles opening and closing dialog 1
  const [open, setOpen] = useState(false);
  const [userDeptCode, setUserDeptCode] = useState("");
  const [userCourseNumber, setUserCourseNumber] = useState("");
  const [userCourseTitle, setUserCourseTitle] = useState("");
  const [userCourseDescription, setUserCourseDescription] = useState("");
  const [userStartDate, setUserStartDate] = useState("");
  const [userEndDate, setUserEndDate] = useState("");

  const [user, setUser] = useState({});

  useEffect(() => {
    //if user is not logged-in, redirect them to the login page
    const sessionEmail = window.sessionStorage.getItem("sessionEmail");
    const sessionStatus = window.sessionStorage.getItem("sessionStatus");
    setUserEmailContext(sessionEmail);
    setIsProfessor(sessionStatus);
    if (sessionEmail == "")
    {
      history.push("/");
    }
    else
    {
      //get user data from database. Store it in a user object?
      axios.get('http://localhost:5000/users/')
      .then(res => {
          let returnedUser = res.data.filter((user) => (user.email == userEmailContext))
          if (returnedUser.length == 0) //error! Could not find user
          {
              console.log(`No user in database with email: ${userEmailContext}`);
          }
          else if (returnedUser.length == 1)
          {
            console.log(returnedUser);
            setUser(returnedUser[0]);
          }
          else
          {
              console.log("Something went very wrong, we have more than one user with the same email");
          }
      })
      .catch(error => {console.log(error)});
    }
  }, [])
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //handles opening and closing dialog 2
  const [open2, setOpen2] = useState(false);
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleCreate = () => {
    let unfilledField = false;
    if (userDeptCode == "" || userCourseNumber == "" || userStartDate == "" || userEndDate == ""){
        alert("Please fill all the required fields!");
        unfilledField = true;
    }

    if (!unfilledField){


      // //TODO: trying to generate a permission number. Figure out how to do loops in ReactJS
      let addCourse = false;

      while(!addCourse)
      {
        let min = 100000;
        let max = 999999;
        // parseInt
        let randNumber = Math.floor(Math.random() * (max - min) + min);
        console.log(randNumber);
        // axios.get('http://localhost:5000/courses/').then(res => {
        //       let returnedCourse = res.data.filter((course) => (course.permissionNumber == randNumber));
        //       if (returnedCourse.length == 0) //no class with this permission number exists
        //       {
        //           addCourse = true;
        //       } else {
        //         addCourse = false;
        //       }
              // if (addCourse){
              //     axios.post("http://localhost:5000/courses/add/", newCourse).then(res => {
              //         console.log(res);
              //         // history.push("/calendarpageprof");
              //     }).catch(err => {
              //         console.log(err);
              //     })

              //     axios.post("http://localhost:5000/courses/add/", newCourse).then(res => {
              //         console.log(res);
              //     }).catch(err => {
              //       //emit different kinds of errors? one for duplicate class and another for invalid form input?
              //       // alert("The class you are trying to create already exists!");

              //       // handles duplicate key error. Responds with a 422 status
              //       if (err.response.status === 422){
              //         alert("The class you are trying to create already exists!")
              //       }

              //       console.log(err.response);
                    
              //     })
              // }
        // }


        const newCourse = {
            deptCode: userDeptCode.toUpperCase(),
            courseNumber: userCourseNumber,
            courseTitle: userCourseTitle,
            courseDescription: userCourseDescription,
            startDate: userStartDate,
            endDate: userEndDate,
            // permissionNumber: randNumber
        }
  
      console.log(newCourse);

      axios.post("http://localhost:5000/courses/add/", newCourse).then(res => {
          console.log(res.data);
      }).catch(err => {
        //emit different kinds of errors? one for duplicate class and another for invalid form input?
        // alert("The class you are trying to create already exists!");

        // handles duplicate key error. Responds with a 422 status
        if (err.response.status === 422){
          alert("The class you are trying to create already exists!")
        }

        console.log(err.response);
        
      })
    }

    }
  };


  //returns the subject cards on the left side of calendar
  const loadSubjects = () => {

    //BACKEND - need to know all the classes the user is in

    return (
      <div>
        <Card style={{ height: "100px" }}>
          {SubjectSelector("Science")}
        </Card>
        <Card style={{ height: "100px" }}>
          {SubjectSelector("Math")}
        </Card>
        <Card style={{ height: "100px" }}>
          {SubjectSelector("English")}
        </Card >
        <Card style={{ height: "100px" }}>
          {SubjectSelector("History")}
        </Card>

        {/* will use stuff below once info is loaded from backend */}
        {/* {classes.map(item => {
           return <Card style={{ height: "100px" }}>{SubjectSelector(item)}</Card>;
        })} */}
      </div>
    )
  }

  return (
    <Paper className='CalendarPage'>
      <Paper style={{ width: "23%", float: "left" }}>
        <div className="createclass">
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Create a Class
      </Button>
      </div>
        {open && 
          <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Create a Class</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter information regarding the course
                </DialogContentText>
                <div className="deptcode">
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Department Code"
                    type="text"
                    required
                    onChange={(event)=>{setUserDeptCode(event.target.value)}}
                  /> 
                </div>
                <div className="coursenum">
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Course Number"
                    type="number"
                    required
                    onChange={(event)=>{setUserCourseNumber(event.target.value)}}
                  /> 
                </div>
                <div className="coursetitle">
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Course Title (optional)"
                    type="text"
                    fullWidth
                    onChange={(event)=>{setUserCourseTitle(event.target.value)}}
                  /> 
                </div>
                <div className="coursedescription">
                 <TextField
                    margin="dense"
                    id="standard-multiline-static"
                    label="Course Description (optional)"
                    multiline
                    rows={3}
                    fullWidth
                    onChange={(event)=>{setUserCourseDescription(event.target.value)}}
                  />
      
                </div>
                <form className="startdate" noValidate>
                  <TextField
                    id="date"
                    label="Start Date"
                    type="date"
                    defaultValue={new Date()}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event)=>{setUserStartDate(event.target.value)}}
                  />
                </form>
                <form className="enddate" noValidate>
                  <TextField
                    id="date"
                    label="End Date"
                    type="date"
                    defaultValue={new Date()}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event)=>{setUserEndDate(event.target.value)}}
                  />
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleCreate} color="primary">
                  Continue
                </Button>
              </DialogActions>
            </Dialog>
          </div>}
          {open2 && 
            <div>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create a Class</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Your course has been created! To add events, navigate to the course's calendar and double click the calendar to bring up the event form.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose2} color="primary">
                    Finish
                  </Button>
                </DialogActions>
              </Dialog>
            </div>}
        {loadSubjects()}
      </Paper>
      <Paper style={{ width: "75%", height: "50%", float: "left", marginLeft: "15px" }}>
        <BrowserRouter>
          <Calendar />
        </BrowserRouter>
      </Paper>
    </Paper>

  )

};

export default CalendarPage;