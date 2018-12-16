import React, { Component } from 'react';
import {Route, Router, Switch} from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import './App.css';
import Signin from "./components/Login/Signin";
import Signup from "./components/Login/Signup";
import Dashboard from './components/Dashboard';
import MovieAdd from './components/Movie/MovieAdd';
import BrowseMovies from "./components/BrowseMovies";
import test from "./components/test";
import MovieDetails from "./components/MovieDetails";
import CardPayment from "./components/CardPayment";
import UserSubscription from "./components/Users/UserSubscription";

export const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history = {history}>
          <Switch>
            <Route exact path="/signin" component={Signin}/>
            <Route exact path="/signup" component={Signup}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/addmovie" component={MovieAdd}/>
            <AdminRoute exact path="/edit-movie/:movieId" render={(props) =>
              <MovieAdd id={props.match.params.movieId}/>
            } />
            <Route exact path="/browsemovies" component={BrowseMovies}/>
            <Route exact path="/subscription" component={UserSubscription}/>
            <Route exact path="/moviedetails/:movieId" render = {(props) => {
            return (
              <MovieDetails id={props.match.params.movieId}/>
            )
            }}/>
            <Route exact path="/test" component={test}/>
            <Route exact path="/payment" component={CardPayment}/>
            <Route path="/" component={Signin}/>
            <PrivateRoute/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
