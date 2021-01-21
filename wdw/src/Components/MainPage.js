import React from 'react';
import ReactDOM from 'react-dom';
// import Calendar from './Calendar';
import Calendar from './Calendar';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import SubjectSelector from './SubjectSelector';
import wdw from './wdw.png';
import { BrowserRouter } from 'react-router-dom';

class MainPage extends React.Component {
  render() {
    return (
      <Paper>
        <Card name="topNavBar" style={{ height: "150px" }}>
          <img src={wdw} style={{ height: "125px", width: "250px", float: "right" }} />
        </Card>
        <Paper >
          <Paper style={{ width: "25%", float: "left" }}>
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
          <Paper style={{ width: "75%", height: "50%", float: "left" }}>
            <BrowserRouter>
              <Calendar />
            </BrowserRouter>
          </Paper>
        </Paper>
      </Paper>

    );
  }
}

export default MainPage;