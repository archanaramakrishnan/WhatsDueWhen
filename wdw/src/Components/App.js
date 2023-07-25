import React, { Component, useEffect } from 'react';
import Home from "./Home"
import Navbar from "./Navbar"
import CalendarPage from "./CalendarPage"
import CalendarPageStudent from "./CalendarPageStudent"
import Error from "./Error"
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Login from './Login';
import WebPage from './WebPage';
import CreateUser from './CreateUser';
import CreateClassDialog from './CreateClassDialog';
import CreateUserDialog from './CreateUserDialog';
import Calendar from './Calendar';
import { ContextProvider } from './ContextProvider';
import GoogleMiddleware from './GoogleMiddleware';

class App extends Component {

    render() {
        return (
            <main>
                <ContextProvider>
                    <LandingNavigation />
                </ContextProvider>
            </main>
        );
    }
}

const LandingNavigation = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}></Route>
                <Route exact path="/createuser" component={CreateUser}></Route>
                <Route exact path="/createclassdialog" component={CreateClassDialog}></Route>
                <Route exact path="/student" component={Calendar}></Route>
                <Route exact path="/createuserdialog" component={CreateUserDialog}></Route>
                <Route exact path="/home">
                    <WebPage > 
                        <Home /> 
                    </WebPage> 
                </Route>
                <Route path="/calendarpageprof" >
                    <WebPage > 
                        <CalendarPage /> 
                    </WebPage> 
                </Route>
                <Route path="/calendarpagestudent" >
                    <WebPage > 
                        <CalendarPageStudent /> 
                    </WebPage> 
                </Route>
                <Route exact path="/error" component={Error} />
                <Route path="/google/middleware" component={GoogleMiddleware}/>
                <Redirect to="/error" />
            </Switch>
        </BrowserRouter>
    );
};

export default App;



