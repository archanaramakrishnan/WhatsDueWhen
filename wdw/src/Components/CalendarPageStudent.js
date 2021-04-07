import React, { useState, useEffect } from 'react';
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

export const CalendarPageStudent = () => {
  //handles opening and closing dialog 1
  const [open, setOpen] = useState(false);
  const [openAddClass, setOpenAddClass] = useState(false);
  const [userDeptCode, setUserDeptCode] = useState("");
  const [userCourseNumber, setUserCourseNumber] = useState("");
  const [userCourseTitle, setUserCourseTitle] = useState("");
  const [userCourseDescription, setUserCourseDescription] = useState("");
  const [userStartDate, setUserStartDate] = useState("");
  const [userEndDate, setUserEndDate] = useState("");
  
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

  const handleClickOpenAddClass = () => {
    setOpenAddClass(true);
};

const handleCloseAddClass = () => {
  setOpenAddClass(true);
};


  const handleCreate = () => {
    let unfilledField = false;
    if (userDeptCode == "" || userCourseNumber == "" || userStartDate == "" || userEndDate == ""){
        alert("Please fill all the required fields!");
        unfilledField = true;
    }

    if (!unfilledField){


      // //TODO: trying to generate a permission number. Figure out how to do loops in ReactJS
      // let addCourse = false;

      // while(!addCourse)
      // {
      //   let min = 100000;
      //   let max = 999999;
      //   let randNumber = min + Math.random() * (max - min);
      //   axios.get('http://localhost:5000/courses/').then(res => {
      //         let returnedCourse = res.data.filter((course) => (course.permissionNumber == randNumber));
      //         if (returnedCourse.length == 0) //no user with this email already exists
      //         {
      //             addCourse = true;
      //         } else {
      //           addCourse = false;
      //         }
      //   }
      
      // }
        
      
      

        const newCourse = {
            deptCode: userDeptCode,
            courseNumber: userCourseNumber,
            courseTitle: userCourseTitle,
            courseDescription: userCourseDescription,
            startDate: userStartDate,
            endDate: userEndDate,
            // permissionNumber: randNumber
        }
  
      console.log(newCourse);

      axios.post("http://localhost:5000/courses/add/", newCourse).then(res => {
          console.log(res);
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
      <Button variant="outlined" color="primary" onClick={handleClickOpenAddClass}>
            Add a Class
      </Button>
      </div>

            {openAddClass && 
          <div>
            <Dialog open={openAddClass} onClose={handleCloseAddClass} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add a Class</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter the permission number of the course you want to add to your calendar
                </DialogContentText>
                <div className="permno">
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Permission Number"
                    type="text"
                    required
                    // onChange={(event)=>{setUserDeptCode(event.target.value)}}
                  /> 
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseAddClass} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleCreate} color="primary">
                  Continue
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

export default CalendarPageStudent;