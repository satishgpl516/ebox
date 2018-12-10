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
      console.log("Get Movies Error", error);
      dispatch({type: MOVIE.GET_MOVIES_FAIL, error});
    })
    .then(json => {
      dispatch({type: MOVIE.GET_MOVIES_SUCCESS, json})
    });
};
