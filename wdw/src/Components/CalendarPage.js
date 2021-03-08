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
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  const [selectedDate, setSelectedDate] = React.useState(today);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <Paper className='CalendarPage'>
      <Paper style={{ width: "23%", float: "left" }}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Create a Class
      </Button>
        {open && 
    <div>
          
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter the department code and class number (e.g. EECS 168)
          </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Department Code"
                type="text"
                fullWidth
              /> 
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Course Number"
                type="number"
                fullWidth
              /> 
        {/* <LocalizationProvider dateAdapter={lab.AdapterDateFns}>
        <DesktopDatePicker
          label="For desktop"
          value={value}
          minDate={new Date('2017-01-01')}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} margin="normal" />}
        />
        </LocalizationProvider> */}
        <form noValidate>
          <TextField
            id="date"
            label="Start Date"
            type="date"
            defaultValue={today}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <form noValidate>
          <TextField
            id="date"
            label="End Date"
            type="date"
            defaultValue={today}
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
              <Button onClick={handleClose} color="primary">
                Continue
          </Button>
            </DialogActions>
          </Dialog>
        </div>}
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