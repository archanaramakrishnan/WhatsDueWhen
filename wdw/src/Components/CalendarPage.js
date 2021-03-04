import React from 'react';
import './CalendarPage.css';
// import Calendar from './Calendar';
import Calendar from './Calendar';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import SubjectSelector from './SubjectSelector';
import { BrowserRouter } from 'react-router-dom';

CalendarPage = () => {
  const[open, setOpen] = useState(false);

  return(
      <Paper className='CalendarPage'>
  <Paper style={{ width: "23%", float: "left" }}>
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
    {open && <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create a Class
      </Button>
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
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /></MuiPickersUtilsProvider> */}
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