import React, { Component, useContext, useEffect, useState } from 'react';
import { Router, Route, Switch, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import './CreateUser.css'
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


//Providing global access to logged-in user email
import { Context } from './ContextProvider';

//For contecting to our backend
import axios from 'axios';

export const CreateUser = (props) => {
    //Gets global variable for logged-in user email and function for setting that variable
    const {isProfessor, setIsProfessor} = React.useContext(Context);

    //Allow us to navigate to other components based on RL
    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userPasswordEntered, setUserPasswordEntered] = useState("");
    const [open, setOpen] = useState(true);
    const [studentFill, setStudentFill] = useState("outlined");
    const [facultyFill, setFacultyFill] = useState("outlined");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [createAccountAsStudent, setCreateAccountAsStudent] = useState(true);

    //Allow us to navigate to other components based on URL
    const history = useHistory();

    const handleCreate = () => {
        let unfilledField = false;
        let addUser = false;
        if (userFirstName == "" || userLastName == "" || userEmail == "" || userPassword == ""){
            alert("Please fill all fields!");
            unfilledField = true;
        }
        let emailFormatRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!userEmail.match(emailFormatRegEx) && unfilledField == false)
        {
            alert("Enter a valid email bruh.");
            unfilledField = true;
        }
        if (userPassword != userPasswordEntered && unfilledField == false){
            alert("Your passwords don't match!");
            unfilledField = true;
        }
        if (!unfilledField){
            const newUser = {
                firstname: userFirstName,
                lastname: userLastName,
                email: userEmail,
                password: userPassword,
                isProfessor: isProfessor,
                classList: []
            }
            // console.log(newUser);

            // adds user to database, otherwise
            axios.post('http://localhost:5000/auth/createuser', {email: userEmail, password: userPassword, isProfessor: isProfessor}, {withCredentials: true})
                .then((res) => {
                    console.log(res)
                    alert("Account created successfully! Use these credentials to log in :)");
                    history.push("/")
                })
                .catch(err => {
                    if (err) {
                        alert("Something is wrong with a your email and password combination.")
                    }
                });
        }
    };

    const handleClickStudent = () => {
        setStudentFill("contained")
        setFacultyFill("outlined")
        //somehow tell backend that it is creating student account - not yet!
        setIsProfessor(false);
        // setter
        localStorage.setItem('isProfessor', false);
    };

    const handleClickFaculty = () => {
        setFacultyFill("contained")
        setStudentFill("outlined")
        //somehow tell backend that it is creating faculty account
        setIsProfessor(true);
        // setter
        localStorage.setItem('isProfessor', true);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(true);
    };

    const handleContinue = () => {
        setOpen(false);
    }

    const handleGoogleLogin = async () => {
        console.log('attempting to login to google')
    }

    return(
        <Paper className='login'>
            {open && <div>
                <Dialog onClose={handleClose} open={open}>
                    <DialogContent >
                        <Typography gutterBottom>
                            Are you signing up as a student or faculty?
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Typography>
                        <div className='dialogbuttons'>
                            <Button autoFocus  variant={studentFill} onClick={handleClickStudent} color="primary">
                                Student
                            </Button>
                            <Button autoFocus variant={facultyFill} onClick={handleClickFaculty} color="primary">
                                Faculty
                            </Button>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleContinue} color="primary">
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>}


            <img className='wdw' src={wdw} />
            <div className='title'>
                <div className='logintext'>
                    <Typography variant="h4" gutterBottom>
                        Create Your Account
                    </Typography>
                </div>
            </div>
            <div className='name'>
                <div className='fname'>
                    <FormControl fullWidth variant="outlined" className='fname'>
                        <InputLabel >First Name</InputLabel>
                        <OutlinedInput 
                            id='email'
                            onChange={(event)=>{setUserFirstName(event.target.value)}}
                        />
                    </FormControl>
                    </div>
                    <div className='lname'>
                    <FormControl fullWidth variant="outlined" className='lname'>
                        <InputLabel >Last Name</InputLabel>
                        <OutlinedInput 
                            id='email'
                            onChange={(event)=>{setUserLastName(event.target.value)}}    
                        />
                    </FormControl>
                    </div>
                    </div>
                <div className='info'>
                
                    <div className='email'>
                    <FormControl fullWidth variant="outlined" >
                        <InputLabel >Email Address</InputLabel>
                        <OutlinedInput 
                            id='email'
                            type='email'
                            onChange={(event)=>{setUserEmail(event.target.value)}}  
                        />
                    </FormControl>
                    </div>
                    <div className='password'>
                    <FormControl fullWidth variant="outlined" >
                        <InputLabel >Password</InputLabel>
                        <OutlinedInput 
                            id='email'
                            type='password' 
                            onChange={(event)=>{setUserPassword(event.target.value)}}
                        />
                    </FormControl>
                    </div>
                    <div className='password'>
                        <FormControl fullWidth variant="outlined" >
                            <InputLabel >Re-Enter Password</InputLabel>
                            <OutlinedInput 
                                id='email'
                                type='password'
                                onChange={(event)=>{setUserPasswordEntered(event.target.value)}}
                            />
                        </FormControl>
                    </div>
                </div>
                <div className='loginbutton'>
                    <Button variant="contained" size="medium" color="primary" style={{width: '230px'}}
                        onClick={handleCreate}>
                        Create Account
                    </Button>
                </div>
                <div className='or'>
                    <Typography>OR</Typography>
                </div>
                <div className='logingoogle'>
                    <a href = "http://localhost:5000/auth/google">
                        <Button variant="contained" size="medium" color="default" style={{width: '200px'}} onClick={handleGoogleLogin}>
                            Login with Google
                        </Button>
                    </a>
                </div>
        </Paper>
    )
};

export default CreateUser;