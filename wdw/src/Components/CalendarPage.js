import React, {useState } from 'react';
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

export const CalendarPage = () => {
  //handles opening and closing dialog 1
  const [open, setOpen] = useState(false);
  
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

  //Continue button to submit course info
  const handleContinue = () => {
    //get info from text fields, etc
    setOpen2(true);
    // setOpen(false);
    
  };

  //returns the subject cards on the left side of calendar
  const loadSubjects = () => {

    //BACKEND - need to know all the classes the user is in

    return (
      <div>
        <Card style={{ height: "100px" }}>
          {/* <SubjectSelector name="Science" /> */}
          {SubjectSelector("Science")}
        </Card>
        <Card style={{ height: "100px" }}>
          {/* <SubjectSelector name="Math" /> */}
          {SubjectSelector("Math")}
        </Card>
        <Card style={{ height: "100px" }}>
          {/* <SubjectSelector name="English" /> */}
          {SubjectSelector("English")}
        </Card >
        <Card style={{ height: "100px" }}>
          {/* <SubjectSelector name="History" /> */}
          {SubjectSelector("History")}
        </Card>
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
                    onChange={(event)=>{setVariable(event.target.value)}}
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
                  /> 
                </div>
                <div className="deptcode">
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Department Code"
                    type="text"
                    required
                  /> 
                </div>
                <div className="coursedescription">
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Course Description (optional)"
                    type="text"
                    fullWidth
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
                  />
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleContinue} color="primary">
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

  );
}

export default CalendarPage;