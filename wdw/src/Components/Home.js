import React, { useState, useEffect } from 'react';
import './Home.css'
import CheckboxList from "./CheckboxList"
import CurrentDate from "./CurrentDate"
import {Scheduler,MonthView,DateNavigator,
  TodayButton,
  Toolbar,
Appointments} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { useHistory } from 'react-router-dom';

//Providing global access to logged-in user email
import { Context } from './ContextProvider';

//For contecting to our backend
import axios from 'axios';
import appointments from './appointments'

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

/*let appointments = [
  { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
  { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];*/

export const Home = () => {
  //Get value of logged in user's email and their status as a professor or student
  const {userEmailContext, isProfessor, setUserEmailContext, setIsProfessor} = React.useContext(Context);

  //Allow us to navigate to other components based on URL
  const history = useHistory();

  const [data, setData] = useState(appointments);
  const [currentDate, setCurrentDate] = useState(today);

  const [user, setUser] = useState({});

  // const loadEvents = () => {
  //   axios.get('http://localhost:5000/courses/')
  //       .then(res => {
  //         //filter each course's events list for the current day's events
  //         console.log(res.data)
  //       })
  //       .catch(error => {console.log(error)});
  // }

  useEffect(() => {
    //if user is not logged-in, redirect them to the login page
    const sessionEmail = window.sessionStorage.getItem("sessionEmail");
    const sessionStatus = window.sessionStorage.getItem("sessionStatus");
    setUserEmailContext(sessionEmail);
    setIsProfessor(sessionStatus);
    if (sessionEmail == "")
    {
      history.push("/home");
    }
    else
    {
      //get user data from database. Store it in a user object?
      axios.get('http://localhost:5000/users/')
      .then(res => {
          let returnedUser = res.data.filter((user) => (user.email == userEmailContext))
          if (returnedUser.length == 0) //error! Could not find user
          {
              console.log(`No user in database with email: ${userEmailContext}`);
          }
          else if (returnedUser.length == 1)
          {
            console.log(returnedUser);
            setUser(returnedUser[0]);
          }
          else
          {
              console.log("Something went very wrong, we have more than one user with the same email");
          }
      })
      .catch(error => {console.log(error)});
    }
  }, [])

  return (
    <div>
      <Paper style={{float: "left", width: "48.5%"}}>
        <div className="title">
          <Typography variant="h3" gutterBottom>
            On Your Calendar Today
          </Typography>
          <Typography variant="h5" gutterBottom>
            <CurrentDate />
          </Typography>
        </div>
        <CheckboxList />
      </Paper>
      <Paper style={{width: "50%", float: "left", marginLeft: "15px"}}>
        <Scheduler
          data = {appointments}
          height={600}
        >
          <ViewState
            defaultCurrentDate={today}
            defaultCurrentViewName="Month"
          />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
        </Scheduler>
      </Paper>
    </div>
  );
}

export default Home;