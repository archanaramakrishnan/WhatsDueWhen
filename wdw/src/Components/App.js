import React, { Component } from 'react';
import Home from "./Home"
import Navbar from "./Navbar"
import MainPage from "./MainPage"
import Error from "./Error"
import { Router, Route, Switch } from 'react-router-dom';
import NavBar from './Navbar';


class App extends Component {

    render() {
        return (
            <main>
                <Navbar />
                {/* {NavBar()} */}
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/home" component={Home} exact />
                    <Route path="/mainpage" component={MainPage} />
                    <Route component={Error} />
                </Switch>
            </main>
        );
    }
}

export default App;



