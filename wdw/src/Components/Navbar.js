//Ref: https://medium.com/javascript-in-plain-english/simple-react-router-nav-bar-17167beeb742
import './Navbar.css';
import React, { Component, useEffect } from 'react';
import { BrowserRouter, Link, useHistory } from "react-router-dom";
import Card from '@material-ui/core/Card';
import wdw from './wdw.png';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import LoggedIn from './LoggedIn';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withStyles } from '@material-ui/core/styles';


const NavBar = (props) => {
  //This is a react router "Hook" (a built in function). Calling history.push("link-name") will change the current page to the one specified
  //by the url in the function LandingNavigation inside of App.js
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (

    <Card className='card'>
      <div className='flex-container'>
      
        <div className='flex-item'>
          <img className='wdwimage' src={wdw} />
        </div>
        {/* <div className='loggedinitem'>
          <LoggedIn />
        </div> */}
        <div className='loggedinitem'>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Username
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
      </div>
      <AppBar position="static">
      
        <Tabs className='tabs'>
          <Tab label="Home" onClick={() => {history.push("/home")}} />
          <Tab label="Calendar" onClick={() => {history.push("/calendarpage")}} />
          <div style={{width: "350px"}}/>
        </Tabs>
      </AppBar>
      
    </Card>

  );
}

export default NavBar;