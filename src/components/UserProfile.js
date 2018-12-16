import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {doSignout} from "../actions/SigninActions";

class UserProfile extends Component{
  constructor(props){
    super(props);
    this.handleSignout = this.handleSignout.bind(this);
  }

  handleSignout(){
    this.props.doSignout();
  }
  render() {
    console.log(this.props.user);
    return (
      <div className="UserProfile">
        <div className="User">
          <a style={{fontSize: '18px', color: 'white', marginRight:'20px'}} href="/getSubscription">Get Subscription</a>
          <ul>
              <li onClick={this.handleSignout}>Signout</li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      doSignout
    }, dispatch)
  }
}

export default connect(null,mapDispatchToProps)(UserProfile);
