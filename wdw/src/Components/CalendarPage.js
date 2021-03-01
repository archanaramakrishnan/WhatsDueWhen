import React from 'react';
import './CalendarPage.css';
// import Calendar from './Calendar';
import Calendar from './Calendar';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import SubjectSelector from './SubjectSelector';
import { BrowserRouter } from 'react-router-dom';

class CalendarPage extends React.Component {
  render() {
    return (
      <Paper className='CalendarPage'>
          <Paper style={{ width: "23%", float: "left" }}>
            <Card style={{ height: "100px" }}>
              {/* <SubjectSelector name="Science" /> */}
              {SubjectSelector("Science")}
            </Card>
            <Card style={{ height: "100px" }}>
              {/* <SubjectSelector name="Math" /> */}
              {SubjectSelector("Math")}
            </Card>
            <Card style={{ height: "100px" }}>
              {/* <SubjectSelector name="English" /> */}
              {SubjectSelector("English")}
            </Card >
            <Card style={{ height: "100px" }}>
              {/* <SubjectSelector name="History" /> */}
              {SubjectSelector("History")}
            </Card>
          </Paper>
          <Paper style={{ width: "75%", height: "50%", float: "left", marginLeft:"15px" }}>
            <BrowserRouter>
              <Calendar />
            </BrowserRouter>
          </Paper>
      </Paper>

    );
  }
}

export default CalendarPage;