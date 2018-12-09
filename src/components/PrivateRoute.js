import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {onComponentDidMount} from 'react-redux-lifecycle';
import {connect} from "react-redux";

class PrivateRoute extends Component {


  componentDidMount() {
    //   console.log("here")
    //   this.props.fetchUser()
    }

    render(){
      return (
        <div>
        </div>
      );
    }
}

export default PrivateRoute;
