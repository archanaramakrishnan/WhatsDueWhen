import React, { Component } from 'react';
import Home from "./Home"
import Navbar from "./Navbar"
import MainPage from "./MainPage"
import Error from "./Error"
import Login from './Login'
import Logout from './Logout'
import { Router, Route, Switch } from 'react-router-dom';


class App extends Component {

    render() {
        return (
            <main>
                <Navbar />
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/home" component={Home} exact />
                    <Route path="/mainpage" component={MainPage} />
                    <Route component={Error} />
                </Switch>
                <Login />
                <Logout />
            </main>
        );
    }
}

export default App;



