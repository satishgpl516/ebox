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
    default:
      return state;
  }
};
