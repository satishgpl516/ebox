import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {doSignout} from "../actions/SigninActions";
import {getUserSubscription} from "../actions/UserActions";

class UserProfile extends Component{
  constructor(props){
    super(props);
    this.handleSignout = this.handleSignout.bind(this);
  }
  async componentDidMount(){
    let username = localStorage.getItem('user');
   await this.props.getUserSubscription(username);
  }

  handleSignout(){
    this.props.doSignout();
  }
  render() {
    const{isSubscribed} = this.props;
    console.log("isSubscro", isSubscribed);
    return (
      <div className="UserProfile">
        <div className="User">
          {(!isSubscribed && <a style={{fontSize: '18px', color: 'white', marginRight:'20px'}} href="/subscription">Get Subscription</a>) }
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
      doSignout, getUserSubscription
    }, dispatch)
  }
}

function mapStateToProps(state){
  return{
    isSubscribed: state.userSubscription.data
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);
