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
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import axios from 'axios';

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;


export default class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentDate: today,
      resource: [],
      editingFormVisible: false,
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
    this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this);
  }

  async componentDidMount() {

    await axios.get('http://localhost:5000/users/events', { withCredentials: true })
      .then(res => {

        //  assigns ids to events
        let appointments = res.data
        let nextId = 0;
        appointments.forEach(appointment => {
          appointment.id = nextId
          nextId++;
        });


        console.log("classList");
        console.log(this.props.classList);

        // //filter data correctly
        // let tempData = [];
        // tempData = appointments;
        // console.log("data before filtering is:");
        // console.log(tempData);
        // //filtered data
        // tempData = appointments.filter(item => 
        //   console.log(item.class);

        //   {this.props.classList.includes(item.class)});
        // console.log("data after filtering is:");
        // console.log(tempData);

        this.setState({ data: appointments })
      })
      .catch(err => {
        console.log(err)
      });

    // Get the dept code and course number to pass into resources
    await axios.get('http://localhost:5000/users/courses', { withCredentials: true })
      .then(res => {
        console.log("The res is:", res.data);
        let result = res.data.map(course => course.deptCode + " " + course.courseNumber);
        console.log(result)
        this.setState({ subjectList: result });
        let colors = res.data.map(course => course.color);
        console.log(colors);
        let localResources = []
        for (let i = 0; i < this.state.subjectList.length; i++) {
          localResources.push({ id: this.state.subjectList[i], text: this.state.subjectList[i], color: colors[i] });
        }
        console.log("localResources:");
        console.log(localResources);
        this.setState({
          resource:
            [
              {
                fieldName: 'class',
                title: 'Class',
                instances: localResources
              }
            ]
        })
        console.log(localResources);
      })
      .catch(err => {
        console.log(err);
      });

  }

  async componentWillReceiveProps(props) {
    const { refresh, classList } = this.props;
    console.log("class list is:");
    console.log(classList);
    console.log('refresh', refresh)
    if (props.refresh !== refresh || props.classList.length !== classList.length) {
      console.log("Prop Refreshed!")
      await axios.get('http://localhost:5000/users/events', { withCredentials: true })
      .then(res => {

        //  assigns ids to events
        let appointments = res.data
        let nextId = 0;
        appointments.forEach(appointment => {
          appointment.id = nextId
          nextId++;
        });

        if (props.classList.length !== classList.length)
        {
          let tempData = [];
          tempData = appointments;
          tempData = appointments.filter(item => {
              let temp = this.props.classList.includes(item.class);
              console.log(temp);
              return temp;
            });
          appointments = tempData;
        }

        console.log('appointments:', appointments)
        this.setState({ data: appointments })
      })
      .catch(err => {
        console.log(err)
      });

        // Get the dept code and course number to pass into resources
      await axios.get('http://localhost:5000/users/courses', { withCredentials: true })
      .then(res => {
        console.log("The res is:", res.data);
        let result = res.data.map(course => course.deptCode + " " + course.courseNumber);
        console.log(result)
        this.setState({ subjectList: result });
        let colors = res.data.map(course => course.color);
        console.log(colors);
        let localResources = []
        for (let i = 0; i < this.state.subjectList.length; i++) {
          localResources.push({ id: this.state.subjectList[i], text: this.state.subjectList[i], color: colors[i] });
        }
        console.log("localResources:");
        console.log(localResources);
        this.setState({
          resource:
            [
              {
                fieldName: 'class',
                title: 'Class',
                instances: localResources
              }
            ]
        })
        console.log(localResources);
      })
      .catch(err => {
        console.log(err);
      });

    }
  }

  toggleEditingFormVisibility() {
    const { editingFormVisible } = this.state;
    this.setState({
      editingFormVisible: !editingFormVisible,
    });
  }

  onAddedAppointmentChange(addedAppointment) {
    this.setState({ addedAppointment });
    const { editingAppointment } = this.state;
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment,
      });
    }
    this.setState({ editingAppointment: undefined, isNewAppointment: true });
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

        //                adds event to database
        axios.post('http://localhost:5000/courses/add-event', added)
          .then(res => {

          })
          .catch(err => {
            console.log(err)
          })
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        const deletedCourse = data.find(({ id }) => id === deleted)
        data = data.filter(appointment => appointment.id !== deleted);

        //                        deletes event in database
        axios.post('http://localhost:5000/courses/delete-event', deletedCourse)
          .then(res => {
            console.log("Course is deleted.")
          })
          .catch(err => {
            console.log(err);
          })
      }
      return { data };
    });
  }

  render() {
    const { editingFormVisible, currentDate, data, resource } = this.state;
    console.log('resources', resource)

    return (
      <Paper >

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
            onAddedAppointmentChange={this.onAddedAppointmentChange}
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
          <AppointmentForm 
            visible={editingFormVisible}
            onVisibilityChange={this.toggleEditingFormVisibility}
          />
          <Resources
            data={resource}
          // mainResourceName='class'
          />
          {/* <Resources field='Class' title='Class' name='Class' textField='Name' idField='PermissionNumber' colorField='Color' dataSource={resourceData} /> */}  
        </Scheduler >
        <Fab
          color="secondary"
          onClick={() => {
            this.setState({ editingFormVisible: true });
            this.onAddedAppointmentChange({
               startDate: new Date(currentDate).setHours(9),
               endDate: new Date(currentDate).setHours(9 + 1),
            });
          }}
          style={{position: 'absolute', right: '50px', bottom: '225px', background: '#3f50b5'}}
        >
          <AddIcon />
        </Fab>
      </Paper >
    );
  }
}