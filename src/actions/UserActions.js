import {apiHeader, USER, ROOT_URL, PAYMENT} from "../constants";
import axios from "axios/index";
import {history} from "../App";
import swal from "sweetalert";
axios.defaults.withCredentials = true;

export const getUserPayPerViewMovies = (username) => (dispatch) => {
  dispatch({type: USER.GET_USER_PAID_MOVIES});
  return axios.get(`${ROOT_URL}/movies/${username}`, apiHeader).then(response => {
    console.log(response);
    dispatch({type: USER.GET_USER_PAID_MOVIES_SUCCESS, payload: response})
  })
    .catch(error => {
      console.log("Get Movies Error", error);
      dispatch({type: USER.GET_USER_PAID_MOVIES_FAILURE, error});
    });
};

export const getUserSubscription = (username) => (dispatch) => {
  dispatch({type: USER.GET_USER_SUBSCRIPTION});
  return axios.get(`${ROOT_URL}/movies/${username}`, apiHeader).then(response => {
    console.log(response);
    dispatch({type: USER.GET_USER_SUBSCRIPTION_SUCCESS, payload: response})
  })
    .catch(error => {
      console.log("Get Movies Error", error);
      dispatch({type: USER.GET_USER_SUBSCRIPTION_FAILURE, error});
    });
};

export const payPerMovie = (username, price) => (dispatch) => {
  dispatch({type: PAYMENT.PAY_FOR_MOVIE});
  console.log("inside Movies action");
  return axios.post(`${ROOT_URL}/movies/`, {user: username, price: price}, apiHeader)
    .then(response => response.json())
    .catch(error => {
      console.log("fetchSpendAgency Error", error);
      dispatch({type: PAYMENT.PAY_FOR_MOVIE_FAIL, error});
    })
    .then(json => {
      swal("Payment successful, Movie is added");
      window.location.reload();
      dispatch({type: PAYMENT.PAY_FOR_MOVIE_SUCCESS, payload:json})
    });
};

export const payUserSubscription = (username, price) => (dispatch) => {
  dispatch({type: PAYMENT.GET_USER_SUBSCRIPTION});
  console.log("inside Movies action");
  return axios.post(`${ROOT_URL}/movies/`, {user: username, price: price}, apiHeader)
    .then(response => response.json())
    .catch(error => {
      console.log("UserSubscription Error", error);
      dispatch({type: PAYMENT.GET_USER_SUBSCRIPTION_FAILURE, error});
    })
    .then(json => {
      swal("Payment successful Subscription added");
      history.push("/browsemovies");
      dispatch({type: PAYMENT.GET_USER_SUBSCRIPTION_SUCCESS, payload:json})
    });
};


export const getUserwatchHistory = (username) => (dispatch) => {
  dispatch({type: USER.GET_USER_WATCH_HISTORY});
  return axios.get(`${ROOT_URL}/movies/${username}`, apiHeader).then(response => {
    console.log(response);
    dispatch({type: USER.GET_USER_WATCH_HISTORY_SUCCESS, payload: response})
  })
    .catch(error => {
      console.log("Get Movies Error", error);
      dispatch({type: USER.GET_USER_WATCH_HISTORY_FAIL, error});
    });
};
