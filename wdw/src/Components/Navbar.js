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
import Home from './Home';



const NavBar = (props) => {
  //This is a react router "Hook" (a built in function). Calling history.push("link-name") will change the current page to the one specified
  //by the url in the function LandingNavigation inside of App.js
  const history = useHistory();

  return (

    <Card className='card'>
      {/* <Link to="/home" className='headerlink-title'>Home</Link>
            &nbsp;&nbsp;
      <Link to="/mainpage" className='headerlink-title'>MainPage</Link> */}
      <form autoComplete="off" className='form'>
      <TextField className="searchBar" label="Search" variant="outlined" />
    </form>
      <div className="container">
      <img className='wdw' src={wdw} />
      </div>
      <AppBar position="static">
    <Tabs className='tabs'>
      <Tab label="Home" onClick={() => {history.push("/home")}} />
      <Tab label="Calendar" onClick={() => {history.push("/calendarpage")}} />
      <div style={{width: "350px"}}/>
      {/* <img className='wdw' src={wdw} /> */}
    </Tabs>
  </AppBar>
      
    </Card>

  );
}

export default NavBar;


// export default function NavBar() {

//     const [value, setValue] = React.useState(0);

//     const handleChange = (event, newValue) => {
//       setValue(newValue);
//     };

//     function TabPanel(props) {
//       const { children, value, index, ...other } = props;
//       return (
//         <div {...other}>
//           {value === index && {children}}
//         </div>
//       );
//     }

//     return (

//       <Card className='card'>
//         {/* <Link to="/home" className='headerlink-title'>Home</Link>
//               &nbsp;&nbsp;
//         <Link to="/mainpage" className='headerlink-title'>MainPage</Link> */}
//         <form autoComplete="off" className='form'>
//         <TextField className="searchBar" label="Search" variant="outlined" />
//       </form>
//         <img className='wdw' src={wdw} />
//         <AppBar position="static">
//       <Tabs className='tabs' value={value} onChange={handleChange} indicatorColor="primary">
//         <Tab label="Home" />
//         <Tab label="Calendar" />
//         <div style={{width: "350px"}}/>
//         {/* <img className='wdw' src={wdw} /> */}
//       </Tabs>
//     </AppBar>
//     <TabPanel value={value} index={0}>
//         <Home />
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         <MainPage />
//       </TabPanel>
//       </Card>

//     );
// }
