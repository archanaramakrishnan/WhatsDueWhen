import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Error from './Error';
import { ViewState, EditingState, IntegratedEditing, Resources } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  DateNavigator,
  Appointments,
  TodayButton,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
  Toolbar,
  ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';
import axios from 'axios';

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

let appointments = [
    { startDate: '2021-04-17T09:45', endDate: '2021-04-17T11:00', title: 'Meeting' },
    { startDate: '2021-04-17T12:00', endDate: '2021-04-17T13:30', title: 'Go to a gym' },
  ];

  let resourceData = [
    { Name: 'EECS 168', PermissionNumber: '12345', Color: '#ea7a57' },
    { Name: 'EECS 268', PermissionNumber: '56789', Color: '#357CD2' },
    { Name: 'EECS 368', PermissionNumber: '24689', Color: '#7fa900' },
  ];

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentDate: today,
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  async componentDidMount() {
    // await axios.get('http://localhost:5000/users/good', {withCredentials: true})
    //   .then(res => {
    //     console.log(res.data);
    //     this.setState({data: res.data})
    //   })
    console.log('hello')
    await axios.get('http://localhost:5000/users/events', {withCredentials: true})
      .then(res => {
        console.log("response", res.data)
        //assign id

        this.setState({data: res.data})
      })
      .catch(err => {
        console.log(err)
      });
  }

  commitChanges({ added, changed, deleted }) {
    console.log("added", added)
    console.log("changed", changed)
    console.log("deleted", deleted)

    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      // console.log(data) 
      return { data };
    });
  }

  render() {
    const { currentDate, data } = this.state;

    return (
      <Paper>
        
        <Scheduler
          data={data}
          height={660}
        >
          <ViewState
            defaultCurrentDate={currentDate}
            defaultCurrentViewName="Week"
          />
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <IntegratedEditing />
          <DayView
            startDayHour={9}
            endDayHour={18}
          />
          <WeekView
            startDayHour={7}
            endDayHour={24}
          />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
          <AppointmentForm />

          {/* <Resources field='Class' title='Class' name='Class' textField='Name' idField='PermissionNumber' colorField='Color' dataSource={resourceData}/> */}
        </Scheduler>
      </Paper>
    );
  }
}