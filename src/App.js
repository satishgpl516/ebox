import React, { Component } from 'react';
import {Route, Router, Redirect, Switch} from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import PrivateRoute from './components/PrivateRoute';
import Landing  from './components/Landing/Landing';
import logo from './logo.svg';
import './App.css';
import Dashboard from "./components/Dashboard";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import AdminSignin from "./components/Admin/AdminSignin";
import AdminSignUp from "./components/Admin/AdminSignUp";
export const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history = {history}>
          <Switch>
            <Route exact path="/login" component={Landing}/>
            <Route exact path="/signin" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/adminSignin" component={AdminSignin}/>
            <Route exact path="/adminSignup" component={AdminSignUp}/>
            <PrivateRoute path="/" component={Dashboard}/>
            <PrivateRoute/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
