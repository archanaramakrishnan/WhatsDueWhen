// import React from 'react';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardDatePicker
//   } from '@material-ui/pickers';

// export default function FormDialog() {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   let today = new Date();
//   let dd = String(today.getDate()).padStart(2, '0');
//   let mm = String(today.getMonth() + 1).padStart(2, '0');
//   let yyyy = today.getFullYear();

//   today = yyyy + '-' + mm + '-' + dd;
//   const [selectedDate, setSelectedDate] = React.useState(today);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   return (
//     <div>
//       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//         Create a Class
//       </Button>
//       <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//         <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Please enter the department code and class number (e.g. EECS 168)
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Department Code"
//             type="text"
//             fullWidth
//           />
//           {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
//           <KeyboardDatePicker
//           disableToolbar
//           variant="inline"
//           format="MM/dd/yyyy"
//           margin="normal"
//           id="date-picker-inline"
//           label="Date picker inline"
//           value={selectedDate}
//           onChange={handleDateChange}
//           KeyboardButtonProps={{
//             'aria-label': 'change date',
//           }}
//         /></MuiPickersUtilsProvider> */}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleClose} color="primary">
//             Continue
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }