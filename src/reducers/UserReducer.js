import {USER} from "../constants";

export const UserPaidMoviesReducer = (state = {}, action) => {
  switch (action.type) {
    case USER.GET_USER_PAID_MOVIES:
      return { ...state,
        data: state,
        isFetching: true
      };
    case USER.GET_USER_PAID_MOVIES_SUCCESS:
      console.log("Hello", action);
      return { ...state,
        isFetching: false,
        data: action.payload.data // action.payload.data.d.results[0]
      };
    case USER.GET_USER_PAID_MOVIES_FAILURE:
      return { ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
};

export const getUserSubscription = (state = {}, action) => {
  switch (action.type) {
    case USER.GET_USER_SUBSCRIPTION:
      return { ...state,
        data: state,
        isFetching: true
      };
    case USER.GET_USER_SUBSCRIPTION_SUCCESS:
      console.log("Hello", action);
      return { ...state,
        isFetching: false,
        data: action.payload.data // action.payload.data.d.results[0]
      };
    case USER.GET_USER_SUBSCRIPTION_FAILURE:
      return { ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
};

export const setUserWatchLog = (state = {}, action) => {
  switch (action.type) {
    case USER.SET_USER_WATCH_LOG:
      return { ...state,
        data: state,
        isFetching: true
      };
    case USER.SET_USER_WATCH_LOG_SUCCESS:
      console.log("Hello", action);
      return { ...state,
        isFetching: false,
        data: action.payload.data // action.payload.data.d.results[0]
      };
    case USER.SET_USER_WATCH_LOG_FAIL:
      return { ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
};
