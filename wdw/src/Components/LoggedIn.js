import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react'
import './LoggedIn.css';


export const LoggedIn = () => {  
  
    var [userList,setUserList] = useState([]);

    const popover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">{userList}</Popover.Title>
        <Popover.Content>
          Your profile: 
        </Popover.Content>
        <Button> Log Out </Button>
      </Popover>
    );

    useEffect(() => {

        axios.get('http://localhost:5000/users/').then(res => setUserList(res.data[0].firstname));
    }, []);

    //res => setUserList(res.data)

    return(
          <div className='loggedIn'>
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                <Button variant="info">Username</Button>
            </OverlayTrigger>
          </div>
    )
}
export default LoggedIn;

