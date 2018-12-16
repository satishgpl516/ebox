import axios from "axios";
import {history} from "../App";
import {ROOT_URL, USER, apiHeader, MOVIE} from "../constants";

axios.defaults.withCredentials = true;


export const updateFilteredMovies = (data) => ({
  type: MOVIE.UPDATE_FILTERED_MOVIES,
  data
});

export const getAllMovies = () => (dispatch) => {
  dispatch({type: MOVIE.GET_MOVIES});
  // console.log("FETCH NEW AGENCY DATA _ Y: ", year);
  return axios.get(`${ROOT_URL}/movies/all`, apiHeader).then(response => {
    console.log(response);
    dispatch({type: MOVIE.GET_MOVIES_SUCCESS, payload: response})
  })
    .catch(error => {
      console.log("Get Movies Error", error);
      dispatch({type: MOVIE.GET_MOVIES_FAIL, error});
    });
};


export const addMovie = (values) => (dispatch) => {
  dispatch({type: MOVIE.ADD_MOVIE});
  return axios.post(`${ROOT_URL}/movies/addmovie`, values, apiHeader)
    .then(response => response.json())
    .catch(error => {
      console.log("fetchSpendAgency Error", error);
      dispatch({type: MOVIE.ADD_MOVIE_FAIL, error});
    })
    .then(json => {
      history.push('/browsemovies');
      dispatch({type: MOVIE.ADD_MOVIE_SUCCESS, payload:json})
    });
};

export const updateMovie = (values, movieId) => (dispatch) => {
  dispatch({type: MOVIE.EDIT_MOVIE});
  return axios.put(`${ROOT_URL}/movies/${movieId}`, values, apiHeader)
    .then(response => response.json())
    .catch(error => {
      console.log("fetchSpendAgency Error", error);
      dispatch({type: MOVIE.EDIT_MOVIE_FAIL, error});
    })
    .then(json => {
      history.push('/browsemovies');
      dispatch({type: MOVIE.EDIT_MOVIE_SUCCESS, payload:json})
    });
};

export const deleteMovie = (values) => (dispatch) => {
  dispatch({type: MOVIE.DELETE_MOVIE});
  const config = { headers: apiHeader };
  return axios.delete(`${ROOT_URL}/movies/${values}`, apiHeader)
    .then(response => response.json())
    .catch(error => {
      console.log("fetchSpendAgency Error", error);
      dispatch({type: MOVIE.DELETE_MOVIE_FAIL, error});
    })
    .then(json => {
      history.push('/browsemovies');
      dispatch({type: MOVIE.DELETE_MOVIE_SUCCESS, payload: json})
    });
};

export const getMovieDetails = (movieId) => (dispatch) => {
  dispatch({type: MOVIE.MOVIE_DETAILS});
  return axios.get(`${ROOT_URL}/movies/${movieId}`, apiHeader).then(response => {
    console.log(response);
    dispatch({type: MOVIE.MOVIE_DETAILS_SUCCESS, payload: response})
  })
    .catch(error => {
      console.log("Get Movies Error", error);
      dispatch({type: MOVIE.MOVIE_DETAILS_FAIL, error});
    });
};

export const getMovieReviews = (movieId) => (dispatch) => {
  dispatch({type: MOVIE.GET_MOVIE_REVIEWS});
  return axios.get(`${ROOT_URL}/moviereviews/${movieId}`, apiHeader).then(response => {
    console.log(response);
    dispatch({type: MOVIE.GET_MOVIE_REVIEWS_SUCCESS.response})
  })
    .catch(error => {
      console.log("Get Movies Error", error);
      dispatch({type: MOVIE.GET_MOVIE_REVIEWS_FAIL, error});
    });
};


export const saveReview = (values) => (dispatch) => {
  dispatch({type: MOVIE.ADD_MOVIE});
  return axios.post(`${ROOT_URL}/movies/saveReview`, values, apiHeader)
    .then(response => response.json())
    .catch(error => {
      console.log("fetchSpendAgency Error", error);
      dispatch({type: MOVIE.ADD_MOVIE_FAIL, error});
    })
    .then(json => {
      history.push('/browsemovies');
      dispatch({type: MOVIE.ADD_MOVIE_SUCCESS, payload:json})
    });
};

export const getSearchResults = (searchTerm) => (dispatch) => {
  dispatch({type: MOVIE.GET_SEARCH_RESULTS});
  // console.log("FETCH NEW AGENCY DATA _ Y: ", year);
  return axios.post(`${ROOT_URL}/eb/user/moviesearch?searchtext=${searchTerm}`,{}, apiHeader).then(response => {
    console.log(response);
    dispatch({type: MOVIE.GET_MOVIES_SUCCESS, payload: response});
    history.push("/browsemovies");
  })
    .catch(error => {
      console.log("Get Movies Error", error);
      dispatch({type: MOVIE.GET_SEARCH_RESULTS_FAIL, error});
    });
};
