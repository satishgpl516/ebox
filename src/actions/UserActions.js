import {apiHeader, USER, ROOT_URL, PAYMENT} from "../constants";
import axios from "axios/index";
import {history} from "../App";
import swal from "sweetalert";
axios.defaults.withCredentials = true;

export const getUserPayPerViewMovies = (username) => (dispatch) => {
  dispatch({type: USER.GET_USER_PAID_MOVIES});
  return axios.get(`${ROOT_URL}/movies/customerPaidMovies?username=${username}`, apiHeader).then(response => {
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

  return axios.get(`${ROOT_URL}/movies/isSubscribed?username=${username}`, apiHeader).then(response => {
    console.log(response);
    dispatch({type: USER.GET_USER_SUBSCRIPTION_SUCCESS, payload: response})
  })
    .catch(error => {
      console.log("Get Movies Error", error);
      dispatch({type: USER.GET_USER_SUBSCRIPTION_FAILURE, error});
    });
};

export const payAmount = (username, price, movieId, subscription, months) => (dispatch) => {
  dispatch({type: PAYMENT.PAY_FOR_MOVIE});
  console.log("inside payment movie");
  return axios.post(`${ROOT_URL}/eb/user/subscribe?noOfMonths=${months}&subscriptionType=${subscription}&price=${price}&movieId=${movieId}&username=${username}`, {}, apiHeader)
    .then(response => response.json())
    .catch(error => {
      console.log("User Subscription Error", error);
      dispatch({type: PAYMENT.PAY_FOR_MOVIE_FAIL, error});
    })
    .then(json => {
      swal("Payment successful, Movie is added").then( () => {
        window.location.reload()
      });
      dispatch({type: PAYMENT.PAY_FOR_MOVIE_SUCCESS, payload:json})
    });
};

export const payUserSubscription = (username, price, movieId, subscription, months) => (dispatch) => {
  dispatch({type: PAYMENT.PAY_USER_SUBSCRIPTION});
  console.log("inside pay user subscription");
  return axios.post(`${ROOT_URL}/eb/user/subscribe?noOfMonths=${months}&subscriptionType=${subscription}&price=${price}&movieId=${movieId}&username=${username}`, {}, apiHeader)
    .then(response => response.json())
    .catch(error => {
      console.log("UserSubscription Error", error);
      dispatch({type: PAYMENT.PAY_USER_SUBSCRIPTION_FAILURE, error});
    })
    .then(json => {
      swal("Payment successful Subscription added");
      history.push("/browsemovies");
      dispatch({type: PAYMENT.PAY_USER_SUBSCRIPTION_SUCCESS, payload:json})
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

export const setUserWatchLog = (username, movieId) => (dispatch) => {
  dispatch({type: USER.SET_USER_WATCH_LOG});
  return axios.post(`${ROOT_URL}/movies/startMovie?movieId=${movieId}&userName=${username}`, {}, apiHeader).then(response => {
    console.log(response);
    dispatch({type: USER.SET_USER_WATCH_LOG_SUCCESS, payload: response})
  })
    .catch(error => {
      console.log("Get Movies Error", error);
      dispatch({type: USER.SET_USER_WATCH_LOG_FAIL, error});
    });
};

