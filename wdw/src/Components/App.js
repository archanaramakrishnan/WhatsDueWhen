import React, { Component } from 'react';
import Home from "./Home"
import Navbar from "./Navbar"
import MainPage from "./MainPage"
import Error from "./Error"
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Login from './Login';
import WebPage from './WebPage';


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



