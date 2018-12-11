import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {onComponentDidMount} from 'react-redux-lifecycle';
import {connect} from "react-redux";
import {fetchUser} from "../actions/SigninActions";
import Dashboard from "./Dashboard";
import app from "./Firebase";
class PrivateRoute extends Component {
  constructor(props){
    super(props);
    // this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  componentDidMount() {
      this.props.fetchUser()
    }
    render(){
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
