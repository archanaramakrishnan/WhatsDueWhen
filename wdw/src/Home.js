import React from 'react';
import './Home.css'
import CheckboxList from "./CheckboxList"
import CurrentDate from "./CurrentDate"


let appointments = [
  { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
  { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      currentDate: '2018-11-01',
    };

  }

  render() {

    return (
      <div>
        <div className='welcome'>
          <p className='date-title'> On Your Calendar Today</p>
          <CurrentDate></CurrentDate>
          <p>.{"\n"}</p>
        </div>
        <CheckboxList></CheckboxList>

        <p>Hello, world! This will be the homepage of WDW. It is currently under progress. I changed the component structure by adding an App.js to wrap the Calendar and Home. Those pages are accessible through the top navbar.</p>

      </div>
    );
  }
}