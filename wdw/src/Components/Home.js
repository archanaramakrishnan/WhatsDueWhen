import React, { useState } from 'react';
import './Home.css'
import CheckboxList from "./CheckboxList"
import CurrentDate from "./CurrentDate"
import {Scheduler,MonthView,DateNavigator,
  TodayButton,
  Toolbar,} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

let appointments = [
  { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
  { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];

export const Home = () => {

  const [data, setData] = useState(appointments);
  const [currentDate, setCurrentDate] = useState(today);

  return (
    <div>
      {/* <Paper className='welcome'>
        <p className='date-title'> On Your Calendar Today</p>
        <CurrentDate></CurrentDate>
        <p>.{"\n"}</p>
      </Paper> */}
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