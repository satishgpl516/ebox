import axios from "axios";
import {history} from "../App";
// import swal from "sweetalert";
import {ROOT_URL, USER, apiHeader, MOVIE} from "../constants";
import app from '../components/Firebase'

axios.defaults.withCredentials = true;


export const doSignin = (values) => (dispatch) => {
  dispatch({type: USER.SIGN_IN});

  // console.log("FETCH NEW AGENCY DATA _ Y: ", year);
  app.auth().signInWithEmailAndPassword(values.email, values.password).then((user) =>{
    var user = app.auth().currentUser;
    if(user && user.emailVerified === false){
      alert(`Please verify your email: ${user.email} for verification link`);
      console.log(user);
    }
    else if(user && user.emailVerified){
      return axios.post(`${ROOT_URL}/eb/login?username=${values.email}&emailVerified=true`, values, apiHeader)
        .then(response => response.json()).catch(error => {
          console.log("Sign in save Error", error);
          dispatch({type: USER.SIGN_IN_FAIL, error});
        }).then(json => {
          console.log(`User signed in email: ${user.email}`);
          console.log(user);
          history.push("/browsemovies");
          localStorage.setItem('user', user.email);
          dispatch({type: USER.SIGN_IN_SUCCESS, json});
        });
    }
  }).catch((error) =>{
    alert(`Please signup your email: ${values.email} for singup to ebox`);
    dispatch({type: USER.SIGN_IN_FAIL, error});
  });
};


export const doSignup= (values) => (dispatch) => {
  dispatch({type: USER.SIGN_UP});
  // console.log("FETCH NEW AGENCY DATA _ Y: ", year);
  values.password2 = false;
  app.auth()
    .createUserWithEmailAndPassword(values.email, values.password)
    .then((object) => {
      console.log("User is created");
      console.log(object.user);
      var user = object.user;
      if(user && user.emailVerified === false){
        user.sendEmailVerification().then(() => {
          return axios.post(`${ROOT_URL}/eb/signup?username=${values.email}&firstName=${values.firstname}&lastName=${values.lastname}&password=${values.password}&password2=false`, values, apiHeader)
            .then(response => response.json()).catch(error => {
              console.log("SignUp save Error", error);
              dispatch({type: USER.SIGNUP_FAIL, error});
            }).then(json => {
              console.log("email verification sent to user");
              alert(`Please verify your email: ${user.email} for verification link to signin`);
              history.push("/signin");
              dispatch({type: USER.SIGNUP_SUCCESS, json});
            })
        });
      }
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
      dispatch({type: USER.SIGNUP_FAIL, error})
    });
};


export const doSignout= () => (dispatch) => {
  dispatch({type: USER.SIGN_OUT});
  console.log('Surya info');
  app.auth().signOut().then(() =>{
    history.push("/signin");
    localStorage.removeItem('user');
    dispatch({type: USER.SIGN_OUT_SUCCESS});
  });
};

export const fetchUser = () => (dispatch) => {
  dispatch({type: USER.SIGN_IN});
  let userVal = app.auth().currentUser;
  if(!userVal){
    app.auth().onAuthStateChanged(function (user) {
      userVal = user;
      console.log(userVal);
      dispatch({type: USER.GET_CUURENT_USER_SUCCESS, payload:userVal});
    });
    return userVal;
  }
  };

  export const doVerifySignUp = (values) => (dispatch) => {
    dispatch({type: USER.SIGN_IN});

    // console.log("FETCH NEW AGENCY DATA _ Y: ", year);
    app.auth().signInWithEmailAndPassword(values.email, values.password).then((user) =>{
      var user = app.auth().currentUser;
      if(user && user.emailVerified === false){
        alert(`Please verify your email: ${user.email} for verification link`);
        console.log(user);
      }
      else if(user && user.emailVerified){
        console.log(`User signed in email: ${user.email}`);
        console.log(user);
        history.push("/dashboard");
        dispatch({type: USER.SIGN_IN_SUCCESS, payload:user})
      }
    }).catch((error) =>{
      alert(`Please signup your email: ${values.email} for singup to ebox`);
    });
  };
