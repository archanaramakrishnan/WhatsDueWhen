import React, { Component } from 'react';
import Home from "./Home"
import Navbar from "./Navbar"
import Calendar from "./Calendar"
import Error from "./Error"
import { Route, Switch } from 'react-router-dom';


class App extends Component {

    render() { 
        return (
            <main>
                <Navbar />
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/home" component={Home} exact />
                    <Route path="/calendar" component={Calendar} />
                    <Route component={Error} />
                </Switch>
            </main>
        );
    }
}
 
export default App;



