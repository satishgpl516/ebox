import axios from "axios";
import {history} from "../App";
import {ROOT_URL, USER, apiHeader, MOVIE} from "../constants";

axios.defaults.withCredentials = true;


export const getAllMovies = () => (dispatch) => {
  dispatch({type: MOVIE.GET_MOVIES});
  // console.log("FETCH NEW AGENCY DATA _ Y: ", year);
  return axios.get(`${ROOT_URL}/movies/all`, apiHeader)
    .then(response => response.json())
    .catch(error => {
      console.log("fetchSpendAgency Error", error);
      dispatch({type: MOVIE.GET_MOVIES_FAIL, error});
    })
    .then(json => {
      dispatch({type: MOVIE.GET_MOVIES_SUCCESS, json})
    });
};


export const addMovie = (values) => (dispatch) => {
  dispatch({type: MOVIE.ADD_MOVIE});
  const config = { headers: apiHeader };
  return axios.post(`${ROOT_URL}/movies/addmovie`, values, config)
    .then(response => response.json())
    .catch(error => {
      console.log("fetchSpendAgency Error", error);
      dispatch({type: MOVIE.ADD_MOVIE, error});
    })
    .then(json => {
      history.push('/dashboard');
      dispatch({type: MOVIE.ADD_MOVIE_SUCCESS, json})
    });
};


export const deleteMovie = (values) => (dispatch) => {
  dispatch({type: MOVIE.DELETE_MOVIE});
  const config = { headers: apiHeader };
  return axios.post(`${ROOT_URL}/movies/deletemovie`, values, config)
    .then(response => response.json())
    .catch(error => {
      console.log("fetchSpendAgency Error", error);
      dispatch({type: MOVIE.DELETE_MOVIE, error});
    })
    .then(json => {
      history.push('/dashboard');
      dispatch({type: MOVIE.DELETE_MOVIE_SUCCESS, json})
    });
};


export const editMovie = (values) => (dispatch) => {
  dispatch({type: MOVIE.EDIT_MOVIE});
  const config = { headers: apiHeader };
  return axios.post(`${ROOT_URL}/movies/editmovie`, values, config)
    .then(response => response.json())
    .catch(error => {
      console.log("fetchSpendAgency Error", error);
      dispatch({type: MOVIE.EDIT_MOVIE, error});
    })
    .then(json => {
      history.push('/dashboard');
      dispatch({type: MOVIE.EDIT_MOVIE_SUCCESS, json})
    });
};
