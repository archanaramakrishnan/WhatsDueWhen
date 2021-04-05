import React, { Component, useEffect, useState } from 'react';
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


//Providing global access to logged-in user email
import { Context } from './ContextProvider';

//For contecting to our backend
import axios from 'axios';

export const CreateUser = (props) => {
    const {setUserEmailContext, isProfessor} = React.useContext(Context);

    //Allow us to navigate to other components based on URL
    const history = useHistory();

    const [userEmail, setUserEmail] = useState("");
    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userPasswordEntered, setUserPasswordEntered] = useState("");

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
            console.log(newUser);

            axios.get('http://localhost:5000/users/').then(res => {
                let returnedUser = res.data.filter((user) => (user.email == userEmail));
                if (returnedUser.length == 0) //no user with this email already exists
                {
                    addUser = true;
                } else {
                    addUser = false;
                    alert(`There is already an account with email: ${userEmail}.`);
                }

                if (addUser){
                    axios.post("http://localhost:5000/users/add-user/", newUser).then(res => {
                        console.log(res);
                        if (isProfessor == true)
                        {
                            history.push("/calendarpageprof");
                        } else { //isProfessor == false
                            history.push("/calendarpagestudent");
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }
            })
        }
    };

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
                <Button variant="contained" size="medium" color="default" style={{width: '230px'}}>
                    Continue with Google
                </Button>
            </div>
        </Paper>
    )
};

export default CreateUser;