import {MOVIE} from "../constants";
export const movieReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE.GET_MOVIES:
      return { ...state,
        data: state,
        isFetching: true
      };
    case MOVIE.GET_MOVIES_SUCCESS:
      return { ...state,
        isFetching: false,
        data: action.payload // action.payload.data.d.results[0]
      };
    case MOVIE.GET_MOVIES_FAIL:
      return { ...state,
        isFetching: false,
        error: action.error
      };
    case MOVIE.ADD_MOVIE:
    return{ ...state,
      data : state,
      isFetching: true
    };
    case MOVIE.ADD_MOVIE_SUCCESS:
    return{
      ...state,
      data:action.payload,
      isFetching:false
    };
    case MOVIE.ADD_MOVIE_FAIL:
    return{
      ...state,
      error:action.error,
      isFetching:false
    };
    case MOVIE.EDIT_MOVIE:
    return{ ...state,
      data : state,
      isFetching: true
    };
    case MOVIE.EDIT_MOVIE_SUCCESS:
    return{
      ...state,
      data:action.payload,
      isFetching:false
    };
    case MOVIE.EDIT_MOVIE_FAIL:
    return{
      ...state,
      error:action.error,
      isFetching:false
    };
    case MOVIE.DELETE_MOVIE:
    return{ ...state,
      data : state,
      isFetching: true
    };
    case MOVIE.DELETE_MOVIE_SUCCESS:
    return{
      ...state,
      data:action.payload,
      isFetching:false
    };
    case MOVIE.DELETE_MOVIE_FAIL:
    return{
      ...state,
      error:action.error,
      isFetching:false
    };
    default:
      return state;
  }
};
