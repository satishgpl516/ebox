import axios from "axios";
import {history} from "../App";
// import swal from "sweetalert";
import {ROOT_URL, USER, apiHeader} from "../constants";
import app from '../components/Firebase'

axios.defaults.withCredentials = true;

export const doSignin = (values) => (dispatch) => {
  dispatch({type: USER.SIGN_IN});
  // console.log("FETCH NEW AGENCY DATA _ Y: ", year);
  app.auth().signInWithEmailAndPassword(values.email, values.password).then((user) =>{
    console.log(`User signed in email: ${user.email}`);
    var user = app.auth().currentUser;
    if(user && user.emailVerified === false){
      alert(`Please verify your email: ${user.email} for verification link`);
      console.log(user);
    }
    else if(user && user.emailVerified){
      console.log(`User signed in email: ${values.email}`);
      history.push("/dashboard");
      dispatch({type: USER.SIGN_IN_SUCCESS, payload:user})  
    }
  }).catch((error) =>{
    alert(`Please signup your email: ${values.email} for singup to ebox`);
  });
};

export const doSignup= (values) => (dispatch) => {
  dispatch({type: USER.SIGN_UP});
  // console.log("FETCH NEW AGENCY DATA _ Y: ", year);
  app.auth()
    .createUserWithEmailAndPassword(values.email, values.password)
    .then((object) => {
      console.log("User is created");
      console.log(object.user);
      var user = object.user;
      if(user && user.emailVerified === false){
        user.sendEmailVerification().then(function(){
          console.log("email verification sent to user");
          alert(`Please verify your email: ${user.email} for verification link signup`);
          history.push("/signin")
        });
      }
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export const doSignout= () => (dispatch) => {
  dispatch({type: USER.SIGN_OUT});
  // console.log("FETCH NEW AGENCY DATA _ Y: ", year);
  return axios.post(`http://localhost:8080`, apiHeader)
    .then(response => response.json())
    .catch(error => {
      console.log("fetchSpendAgency Error", error);
      dispatch({type: USER.SIGN_OUT_FAIL, error});
    })
    .then(json => {
      history.push('/dashboard');
      dispatch({type: USER.SIGN_OUT_SUCCESS, json})
    });
};
