import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AstronomerEdit from "./AstronomerEdit";
import StarEdit from "./StarEdit";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/astronomer/:id' component={AstronomerEdit}/>;
                    <Route path='/star/:id' component={StarEdit}/>;
                </Switch>
            </Router>
        )
    }
}

export default App;