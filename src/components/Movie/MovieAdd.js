import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {LOGO} from "../../constants";
import {addMovie} from "../../actions/MoviesActions";
import '../../css/Movieadd.css'
import bgimg from '../../img/bg.jpg'
import styled from 'styled-components';

export const Header = styled.header`
    background: linear-gradient(
                to right,
                rgba(0, 0, 0, 0.75), 
                rgba(0, 0, 0, 0.09)
                ),
                url(${bgimg});
                height: 150vh;
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
class MovieAdd extends Component {
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
    this.props.addMovie(values);
  }

  render() {

    console.log(this.props.error)

    const {handleSubmit, load, pristine, reset, submitting} = this.props;
    return (
      <Header>
        <NavLogo>
          <a href={"/"} className="logo">
            <img src={LOGO} alt="Netflix Logo"/>
          </a>
          <div className="movieadd-body">
            <div className="login-content login-form hybrid-login-form hybrid-login-form-signup">
              <div className="hybrid-login-form-main"><h1>Add Movie</h1>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <table >
                    <tr>
                        <td><Field name="movietitle" type="text" id="movietitle" className ="signin-text" placeholder ="Movie Title" component={this.renderField}/></td>
                        <td><Field name="moviegenre" type="text" id="moviegenre" className ="signin-text" placeholder ="Movie Genre" component={this.renderField}/></td>
                    </tr>
                    <tr>
                        <td><Field name="movieyear" type="text" id="movieyear" className ="signin-text" placeholder ="Movie Year" component={this.renderField}/></td>
                        <td><Field name="moviestudio" type="text" id="moviestudio" className ="signin-text" placeholder ="Movie Studio" component={this.renderField}/></td>
                    </tr>
                    <tr>
                        <td><Field name="moviesynopsis" type="text" id="moviesynopsis" className ="signin-text" placeholder ="Movie Synopsis" component={this.renderField}/></td>
                        <td><Field name="movieimage" type="text" id="movieimage" className ="signin-text" placeholder ="Movie Image" component={this.renderField}/></td>
                    </tr>
                    <tr>
                        <td><Field name="movieactors" type="text" id="movieactors" className ="signin-text" placeholder ="Movie Actors" component={this.renderField}/></td>
                        <td><Field name="moviecountry" type="text" id="moviecountry" className ="signin-text" placeholder ="Movie Country" component={this.renderField}/></td>
                    </tr>
                    <tr>
                        <td><Field name="movierating" type="text" id="movierating" className ="signin-text" placeholder ="Movie Rating" component={this.renderField}/></td>
                        <td><Field name="movievideo" type="text" id="movievideo" className ="signin-text" placeholder ="Movie Video" component={this.renderField}/></td>
                    </tr>
                </table>
                  <Field name="movieavailability" type="text" id="movieavailability" className ="signin-text" placeholder ="Movie Availability" component={this.renderField}/>
                  <button type="submit" disabled={pristine || submitting} className="submit btn mt-2"
                          alternatetext="Sign In">Submit</button>
                </form>
              </div>
              <div className="login-signup-now">Don't want to add <Link to="/dashboard">Cancel</Link></div>
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
  // return ({error: state.user.message})
}


function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      addMovie
    }, dispatch)

  };
}

export default reduxForm({
  validate,
  form: 'MovieAdd'
})(connect(mapStateToProps, mapDispatchToProps)(MovieAdd));
