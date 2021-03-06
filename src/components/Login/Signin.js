import React, {Component} from 'react';
import {Field, reduxForm} from "redux-form";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {LOGO} from "../../constants";
import {doSignin, fetchUser} from "../../actions/SigninActions";
import '../../css/Login.css'
import bgimg from '../../img/bg.jpg'
import styled , { css } from 'styled-components';

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

const Button = styled.button`
    color: white;
    cursor: pointer;
    background-color: #e50914;
    line-height: normal;
    margin: 18px 3% 0 0;
    padding: 7px 17px;
    font-weight: 100;
    border: transparent;
    border-radius: 5px;
    font-size: 16px;
    text-decoration: one;

    ${props => props.right && css`
        float: right;
    `}
    &:hover {
        background-color: #E53935;
    }
    & a{
        text-decoration: none;
        color: white;
    }
`;
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
                <h3 style={{color:"white"}}>Use SJSU(@sjsu.edu) email Address to Signin as admin</h3>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <Field name="email" type="text" id="Username" className ="signin-text" placeholder ="Email Address" component={this.renderField}/>
                  <Field name="password" type="password" className=  "signin-text" placeholder = "Password" maxLength="40" id="PasswordBox"
                         component={this.renderField}/>
                    <button type="submit" disabled={pristine || submitting} className="submit btn mt-2"
                            alternatetext="Sign In">Sign In
                    </button>
                </form>
              </div>
              <div className="login-signup-now">New to Movie Box? <Link to="/signup">Sign up now</Link>.
              </div>
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

  if (!values.password) {
    errors.password = 'Please enter password';
  }

  //if errors is empty , the form is fine to submit
  //if errors has *any* properties, redux form assumes that form is invalid
  return errors;
}


function mapStateToProps(state) {
  return ({error: state.user})
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
