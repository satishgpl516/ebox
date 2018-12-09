import React, {Component} from 'react';
import {Header} from "./Landing/LandingHeader";
import {NavLogo} from "./Landing/Nav";
import {Field, reduxForm} from "redux-form";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import netflixlogo from "./Landing/img/logo.svg";
import {LOGO} from "../constants";
import {doSignin} from "../actions/LoginActions";
import '../css/Login.css'

class Login extends Component {
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
    this.props.doSignin(values);
  }

  render() {

    console.log(this.props.error)

    const {handleSubmit, load, pristine, reset, submitting} = this.props;
    return (
      <Header>
        <NavLogo>
          <a href={"/"} className="logo">
            <img src={LOGO} width={'350px'} height={'100px'} alt="Netflix Logo"/>
          </a>
          <div className="login-body">
            <div className="login-content login-form hybrid-login-form hybrid-login-form-signup">
              <div className="hybrid-login-form-main"><h1>Sign In</h1>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <Field name="email" type="text" id="Username" className ="signin-text" placeholder ="Email Address" component={this.renderField}/>
                  <Field name="password" type="password" className=  "signin-text" placeholder = "password" maxLength="40" id="PasswordBox"
                         component={this.renderField}/>
                    <button type="submit" disabled={pristine || submitting} className="submit btn mt-2"
                            alternatetext="Sign In">Sign In
                    </button>
                </form>
              </div>
              <div className="login-signup-now">New to Netflix? <Link to="/signup">Sign up now</Link>.
              </div>
            </div>
          </div>f
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

  if (!values.password) {
    errors.password = 'Please enter password';
  }

  //if errors is empty , the form is fine to submit
  //if errors has *any* properties, redux form assumes that form is invalid
  return errors;
}


function mapStateToProps(state) {
  // return ({error: state.user.message})
}


function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      doSignin
    }, dispatch)

  };
}

export default reduxForm({
  validate,
  form: 'loginForm'
})(connect(mapStateToProps, mapDispatchToProps)(Login));
