import React, { Component, useEffect, useState } from 'react';
import { Router, Route, Switch, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import './Login.css'
import wdw from './wdw.png'
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import CreateUserDialog from './CreateUserDialog.js'

import { DialogContent } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export const Login = () => {
    const [open, setOpen] = useState(false);
    const history = useHistory();

    const [handleStudent, setHandleStudent] = useState(false);

    const handleClickStudent = () => {
        history.push('/student');

    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return(
        <Paper className='login'>
            <img className='wdw' src={wdw} />
            <div className='title'>
                <div className='logintext'>
        <Typography variant="h4" gutterBottom>
            Welcome!
         </Typography>
         </div>
         <Typography variant="h6" gutterBottom>
            Please login below
         </Typography>
         </div>
            <div className='info'>
                <div className='email'>
                <FormControl fullWidth variant="outlined" >
                    <InputLabel >Email Address</InputLabel>
                    <OutlinedInput id='email'/>
                </FormControl>
                </div>
                <div className='password'>
                <FormControl fullWidth variant="outlined" >
                    <InputLabel >Password</InputLabel>
                    <OutlinedInput id='email' type='password' />
                </FormControl>
                </div>
                
            </div>
            <div className='loginbutton'>
                <Button variant="contained" size="medium" color="primary" style={{width: '200px'}}>
                Login
                </Button>
                </div>
                <div className='or'>
                <Typography>OR</Typography>
                </div>
            <div className='logingoogle'>
            <Button variant="contained" size="medium" color="default" style={{width: '200px'}}>
                Login with Google
                </Button>
                </div>
            <div className='create'>
            <Typography variant="h8" gutterBottom>
                Need to create an account?
            </Typography>
            <Link onClick={handleClickOpen} style={{marginLeft: '5px'}}>
                Click Here
            </Link>
            {/* <Button variant="outlined" color="primary" onClick={CreateUserDialog}>
            Click Here
            </Button> */}
            {/* {CreateUserDialog} */}
            
            {open && <div>
                
                <Dialog onClose={handleClose} open={open}>
                
                
                <DialogContent >
                <Typography gutterBottom>
                    Are you signing up as a student or faculty?
                    <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                </Typography>
                <Button autoFocus onClick={handleClickStudent} color="primary">
                    Student
                </Button>
                <Button autoFocus  color="primary">
                    Professor
                </Button>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    Continue
                </Button>
                </DialogActions>
                </Dialog>
                {/* <CreateUserDialog /> */}
                </div>}
            {/* 
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
            </Dialog> */}
         </div>
        </Paper>
    )
};

export default Login;