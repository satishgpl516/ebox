import React, { Component } from 'react';
import {Route, Router, Switch} from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import SignIn from "./components/SignIn";
import Signup from "./components/Signup";
import Dashboard from './components/Dashboard';

export const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history = {history}>
          <Switch>
            <Route exact path="/signin" component={SignIn}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route path="/" component={SignIn}/>
            <PrivateRoute/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
