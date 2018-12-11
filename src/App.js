import React, { Component } from 'react';
import {Route, Router, Switch} from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import Signin from "./components/Login/Signin";
import Signup from "./components/Login/Signup";
import Dashboard from './components/Dashboard';
import MovieAdd from './components/Movie/MovieAdd';

export const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history = {history}>
          <Switch>
            <Route exact path="/signin" component={Signin}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/movieadd" component={MovieAdd}/>
            <Route path="/" component={Signin}/>
            <PrivateRoute/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
