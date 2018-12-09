import axios from "axios";
import {history} from "../App";
// import swal from "sweetalert";
import {ROOT_URL, USER, apiHeader} from "../constants";

axios.defaults.withCredentials = true;

export const doAdminSignin = (values) => (dispatch) => {
  dispatch({type: USER.SIGN_IN});
  // console.log("FETCH NEW AGENCY DATA _ Y: ", year);
  return axios.post(`http://localhost:8000/`, apiHeader)
    .then(response => response.json())
    .catch(error => {
      console.log("fetchSpendAgency Error", error);
      dispatch({type: USER.SIGN_IN_FAIL, error});
    })
    .then(json => {
      history.push('/dashboard');
      dispatch({type: USER.SIGN_IN_SUCCESS, json})
    });
};

export const doAdminSignup= (values) => (dispatch) => {
  dispatch({type: USER.SIGN_UP});
  // console.log("FETCH NEW AGENCY DATA _ Y: ", year);
  return axios.post(`http://localhost:8000`, apiHeader)
    .then(response => response.json())
    .catch(error => {
      console.log("fetchSpendAgency Error", error);
      dispatch({type: USER.SIGN_UP_FAIL, error});
    })
    .then(json => {
      history.push('/dashboard');
      dispatch({type: USER.SIGN_UP_SUCCESS, json})
    });
};
