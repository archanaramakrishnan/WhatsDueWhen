import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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

//Providing global access to logged-in user email
import { Context } from './ContextProvider';

//For contecting to our backend
import axios from 'axios';

export const Login = () => {
    //Gets global variable for logged-in user email and function for setting that variable
    const {setUserEmailContext, setIsProfessor} = React.useContext(Context);

    //Allow us to navigate to other components based on URL
    const history = useHistory();

    //Setting variables used within the component
    const [open, setOpen] = useState(false);
    const [studentFill, setStudentFill] = useState("outlined");
    const [facultyFill, setFacultyFill] = useState("outlined");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [createAccountAsStudent, setCreateAccountAsStudent] = useState(true);

    useEffect(() => {
        //initialize a new user as a student to handle default case where they don't click a button
        axios.get('http://localhost:5000/users/')
        .then(res => console.log(res.data));
    }, [])

    const handleAttemptedLogin = () => {
        axios.get('http://localhost:5000/users/')
        .then(res => {
            let returnedUser = res.data.filter((user) => (user.email == userEmail))
            if (returnedUser.length == 0)
            {
                console.log(`No user in database wiht email: ${userEmail}`);
                alert("We don't recognize your email, are you a new user?");
            }
            else if (returnedUser.length == 1)
            {
                if (returnedUser[0].password != userPassword)
                {
                    console.log("No user has this password!");
                    alert("We don't recognize your password, please try again!");
                }
                else
                {
                    setUserEmailContext(returnedUser[0].email);
                    history.push("/home");
                }
            }
            else
            {
                console.log("Something went very wrong, we have more than one user with the same email");
            }
        })
        .catch(error => {console.log(error)});
    }

    const [handleStudent, setHandleStudent] = useState(false);

    const handleClickStudent = () => {
        setStudentFill("contained")
        setFacultyFill("outlined")
        //somehow tell backend that it is creating student account - not yet!
        setIsProfessor(false);
    };

    const handleClickFaculty = () => {
        setFacultyFill("contained")
        setStudentFill("outlined")
        //somehow tell backend that it is creating faculty account
        setIsProfessor(true);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleContinue = () => {
        history.push("/createuser")
    }

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
                        <InputLabel>Email Address</InputLabel>
                        <OutlinedInput 
                            id='email'
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
            </div>
            <div className='loginbutton'>
                <Button 
                    variant="contained" 
                    size="medium" 
                    color="primary" 
                    style={{width: '200px'}}
                    onClick={handleAttemptedLogin}>Login
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
            </div>
        </Paper>
    )
};

export default Login;