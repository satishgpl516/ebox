import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {onComponentDidMount} from 'react-redux-lifecycle';
import {connect} from "react-redux";
import {USER} from "../actions/USER";
import {fetchUser} from "../actions/LoginActions";
import Dashboard from "./Dashboard";
import app from "./Firebase";
class PrivateRoute extends Component {
  constructor(props){
    super(props);
    // this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  componentDidMount() {
    //   console.log("here")
      this.props.fetchUser()

    }

    // getCurrentUser(){
    // let userVal = app.auth().currentUser;
    //   app.auth().onAuthStateChanged(function (user) {
    //     userVal = user;
    //     console.log(userVal);
    //   });
    //   return userVal;
    // }

    render(){
    // console.log(this.getCurrentUser());
    const{component: Component, ...props } = this.props;
      console.log(this.props.user);
      if(this.props.user.isFetching){
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
            this.props.user.data ?
              <Component {...props} /> :
              <Redirect to='/signin' />
          )}
        />
      );
    }
    }
}

function mapStateToProps(state){
  return{
    user: state.user
  }
}


export default connect(mapStateToProps,{fetchUser}) (PrivateRoute);
