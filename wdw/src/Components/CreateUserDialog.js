import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

export default function CreateUserDialog() {
  console.log("in CreateUserDialog()");
    const [open, setOpen] = React.useState(false);
    
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open dialog
        </Button>
        <Dialog onClose={handleClose} open={open}>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
          <Dialog.DialogContent >
            <Typography gutterBottom>
              Are you signing up as a student or faculty?
            </Typography>
          </Dialog.DialogContent>
          <Dialog.DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Continue
            </Button>
          </Dialog.DialogActions>
        </Dialog>
      </div>
    );
  }