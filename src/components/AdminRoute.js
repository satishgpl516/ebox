import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {onComponentDidMount} from 'react-redux-lifecycle';
import {connect} from "react-redux";
import {fetchUser} from "../actions/SigninActions";
import Dashboard from "./Dashboard";
import app from "./Firebase";
class AdminRoute extends Component {
  constructor(props){
    super(props);
    // this.getCurrentUser = this.getCurrentUser.bind(this);
    this.checkUserisAdmin = this.checkUserisAdmin.bind(this);
  }

  checkUserisAdmin() {
    let user = localStorage.getItem('user');
    console.log("user email", user);
    return (user.includes('@sjsu.edu'));
  }
  render(){
    const{component: Component, ...props } = this.props;
    let user = this.checkUserisAdmin();
    console.log(this.props.user);
    if(user){
      return (
        <div>
        </div>
      );
    }
    else{
      return(
        <Route
          {...props}
          render={props => (
            this.props.user ?
              <Component {...props} /> :
              <Redirect to='/signin' />
          )}
        />
      );
    }
  }
}

export default AdminRoute;
