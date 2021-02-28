import React, { Component } from 'react';
import Home from "./Home"
import Navbar from "./Navbar"
import MainPage from "./MainPage"
import Error from "./Error"
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Login from './Login';
import WebPage from './WebPage';
import CreateUser from './CreateUser';
import CreateClassDialog from './CreateClassDialog'
import CreateUserDialog from './CreateUserDialog'


class App extends Component {

    render() {
        return (
            <main>
                <LandingNavigation />
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
                <Route exact path="/createuserdialog" component={CreateUserDialog}></Route>
                <Route path="/home" exact >
                    <WebPage > 
                        <Home /> 
                    </WebPage> 
                </Route>
                <Route path="/mainpage" >
                    <WebPage > 
                        <MainPage /> 
                    </WebPage> 
                </Route>
                <Route exact path="/error" component={Error} />
                <Redirect to="/error" />
            </Switch>
        </BrowserRouter>
    );
};

export default App;



