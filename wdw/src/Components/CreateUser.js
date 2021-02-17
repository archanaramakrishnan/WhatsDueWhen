import React, { Component, useEffect } from 'react';
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



export const CreateUser = () => {
    return(
        <Paper className='login'>
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
                    <OutlinedInput id='email'/>
                </FormControl>
                </div>
                <div className='lname'>
                <FormControl fullWidth variant="outlined" className='lname'>
                    <InputLabel >Last Name</InputLabel>
                    <OutlinedInput id='email'/>
                </FormControl>
                </div>
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
                <div className='password'>
                <FormControl fullWidth variant="outlined" >
                    <InputLabel >Re-Enter Password</InputLabel>
                    <OutlinedInput id='email' type='password' />
                </FormControl>
                </div>
                
            </div>
            <div className='loginbutton'>
                <Button variant="contained" size="medium" color="primary" style={{width: '230px'}}>
                Create Account
                </Button>
                </div>
                <div className='or'>
                <Typography>OR</Typography>
                </div>
            <div className='logingoogle'>
            <Button variant="contained" size="medium" color="default" style={{width: '230px'}}>
                Continue with Google
                </Button>
                </div>
        </Paper>
    )
};

export default CreateUser;