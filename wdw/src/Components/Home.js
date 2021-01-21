import React from 'react';
import './Home.css'
import CheckboxList from "./CheckboxList"
import CurrentDate from "./CurrentDate"
import {Scheduler,MonthView,DateNavigator,
  TodayButton,
  Toolbar,} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import Paper from '@material-ui/core/Paper';

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

let appointments = [
  { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
  { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      currentDate: today,
    };

  }

  render() {

    return (
      <div>
        <Paper className='welcome'>
          <p className='date-title'> On Your Calendar Today</p>
          <CurrentDate></CurrentDate>
          <p>.{"\n"}</p>
        </Paper>
        <Paper style={{float: "left", width: "50%"}}>
        <CheckboxList></CheckboxList>
        </Paper>
        <Paper style={{width: "50%", float: "left"}}>
        
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
        <p>Hello, world! This will be the homepage of WDW. It is currently under progress. I changed the component structure by adding an App.js to wrap the Calendar and Home. Those pages are accessible through the top navbar.</p>

      </div>
    );
  }
}