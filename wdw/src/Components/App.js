import React, { Component } from 'react';
import Home from "./Home"
import Navbar from "./Navbar"
import MainPage from "./MainPage"
import Error from "./Error"
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Login from './Login';


class App extends Component {

    render() {
        return (
            <main>
                <LandingNavigation />
            </main>
        );
    }
}

const ContentContainer = () => {
    <Navbar />
};

const LandingNavigation = () => {

    return (
        <BrowserRouter>
            <Navbar/>
            <Switch>
                <Route exact path="/" component={Login}></Route>
                <Route path="/home" component={Home} exact />
                <Route path="/mainpage" component={MainPage} />
                <Route exact path="/error" component={Error} />
                <Redirect to="/error" />
            </Switch>
        </BrowserRouter>
    );
};

export default App;



