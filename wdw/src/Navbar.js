//Ref: https://medium.com/javascript-in-plain-english/simple-react-router-nav-bar-17167beeb742
import './Navbar.css';
import React, { Component } from 'react';
import {Link} from "react-router-dom";

class NavBar extends Component {

    render() { 
        return (

            <div>
              <Link to="/home" className='headerlink-title'>Home</Link>
              &nbsp;&nbsp;
              <Link to="/calendar" className='headerlink-title'>Calendar</Link>
            </div>

          );
    }
}
 
export default NavBar;



