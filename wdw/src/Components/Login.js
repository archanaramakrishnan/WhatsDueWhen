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
    //Allow us to navigate to other components based on URL
    const history = useHistory();

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    useEffect(() => {
        window.sessionStorage.setItem("sessionEmail", "");
        window.sessionStorage.setItem("sessionStatus", "");
        
    }, [])

    const handleAttemptedLogin = () => {

        // post request to log in user
        axios.post('http://localhost:5000/auth/login', {email: userEmail, password: userPassword}, {withCredentials: true})
            .then(res => {
                console.log(res)
                
                // once loggin in, get user info
                axios.get('http://localhost:5000/users/isProfessor', {withCredentials: true})
                    .then(res => {
                        console.log(res)
                        if (res.data) {
                            history.push('/calendarpageprof')
                        } else {
                            history.push('/calendarpagestudent')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })

            })
            .catch(err => {

                if (err.response.status === 404){
                    alert("No user exists with the username and password combination you provided. Try again!")
                }
        
                console.log(err.response);
            });

    }

    const handleClickHere = () => {
        history.push('/createuser')
    }

    const handleGoogleLogin = () => {
        console.log('attempting to login to google')
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
                            type="email"
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
                <a href = "http://localhost:5000/auth/google">
                <Button variant="contained" size="medium" color="default" style={{width: '200px'}} onClick={handleGoogleLogin}>
                    Login with Google
                </Button>
                </a>
            </div>
            <div className='create'>
                <Typography variant="h8" gutterBottom>
                    Need to create an account?
                </Typography>
                <Link onClick={handleClickHere} style={{marginLeft: '5px'}}>
                    Click Here
                </Link>
                {/* <Link onClick={handleClickOpen} style={{marginLeft: '5px'}}>
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
                </div>} */}
            </div>
        </Paper>
    )
};

export default Login;