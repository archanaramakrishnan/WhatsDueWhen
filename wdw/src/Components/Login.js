import React, { Component, useEffect } from 'react';
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



export const Login = () => {
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
            <div className='logingoogle'>
            <Button variant="contained" size="medium" color="default" style={{width: '200px'}}>
                Login with Google
                </Button>
                </div>
            <div className='create'>
            <Typography variant="h8" gutterBottom>
                Need to create an account?
            </Typography>
            <Link href="#" style={{marginLeft: '5px'}}>
                Click Here
            </Link>
         </div>
        </Paper>
    )
};

export default Login;