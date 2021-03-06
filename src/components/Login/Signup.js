import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {LOGO} from "../../constants";
import {doSignup} from "../../actions/SigninActions";
import '../../css/Login.css'
import bgimg from '../../img/bg.jpg'
import styled from 'styled-components';

export const Header = styled.header`
    background: linear-gradient(
                to right,
                rgba(0, 0, 0, 0.75), 
                rgba(0, 0, 0, 0.09)
                ),
                url(${bgimg});
                height: 100vh;
    @media (max-width: 1000px) {
      height: 90vh;
    }
`;

export const NavLogo = styled.nav`
    height: 90px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    /* Netflix logo */
    img {
        width: 350px;
        height : 65px;
        vertical-align: middle;
    }
    .logo {
        display: inline-block;
        line-height: 90px;
        margin: 0 0 0 3%;
    }
`;
class Signup extends Component {
  renderField(field) {
    const {input, meta: {touched, error}} = field;
    const cname = `form-group ${touched && error ? 'has-danger' : ''} `;

    return (
      <div className={cname}>
        {/*<label>{field.label}</label>*/}
        <input className="form-control large-input"
               {...input} {...field}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  renderError() {
    if (this.props.error) {
      return (
        <div className="text-help">
          {this.props.error}
        </div>
      );
    }
  }

  onSubmit(values) {
    console.log(values);
    this.props.doSignup(values);
  }

  render() {
    const {handleSubmit, load, error, pristine, reset, submitting} = this.props;
    return (
      <Header>
        <NavLogo>
          <a href={"/"} className="logo">
            <img src={LOGO} alt="Netflix Logo"/>
          </a>
          <div className="login-body">
            <div className="login-content login-form hybrid-login-form hybrid-login-form-signup">
              <div className="hybrid-login-form-main"><h1>Sign Up</h1>
                <h3 style={{color:"white"}}>Use SJSU(@sjsu.edu) email Address to Signup as an admin</h3>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <Field name="email" type="text" id="Username" className ="signin-text" placeholder ="Email Address" component={this.renderField}/>
                  {error ? (<h3 style={{color:"red"}}>{error}</h3>) : (<h3/>)}
                  <Field name="firstname" type="text" id="firstname" className ="signin-text" placeholder ="First Name" component={this.renderField}/>
                  <Field name="lastname" type="text" id="lastname" className ="signin-text" placeholder ="Last Name" component={this.renderField}/>
                  <Field name="password" type="password" className=  "signin-text" placeholder = "Password" maxLength="40" id="PasswordBox"
                         component={this.renderField}/>
                  <Field name="confirmpassword" type="password" className=  "signin-text" placeholder = "Confirm Password" maxLength="40" id="confirmBox"
                         component={this.renderField}/>
                  <button type="submit" disabled={pristine || submitting} className="submit btn mt-2"
                          alternatetext="Sign In">Sign Up
                  </button>
                </form>
              </div>
              <div className="login-signup-now">Existing User? <Link to="/signin">Sign in</Link></div>
            </div>
          </div>
        </NavLogo>
      </Header>
    )
  }
}

function validate(values) {
  const errors = {};
  //validate input from values

  if (!values.email) {
    errors.email = 'Please enter Username or email address\n';
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!values.firstname) {
    errors.firstname = 'Please enter firstname';
  }
  if(!values.lastname){
    errors.lastname = 'please enter your lastname';
  }
  if (!values.password) {
    errors.password = 'Please enter password';
  }
  if(!values.confirmpassword){
    errors.confirmpassword = 'please confirm your password';
  }
  else if( (values.password > 5) && (values.password !== values.confirmpassword)){
    errors.confirmpassword = 'passwords don\'t match please enter again';
  }

  //if errors is empty , the form is fine to submit
  //if errors has *any* properties, redux form assumes that form is invalid
  return errors;
}


function mapStateToProps(state) {
  return ({
    error: (state.userSignup && state.userSignup.error) && state.userSignup.error.message || null
  })
}


function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      doSignup
    }, dispatch)

  };
}

export default reduxForm({
  validate,
  form: 'SignUp'
})(connect(mapStateToProps, mapDispatchToProps)(Signup));
