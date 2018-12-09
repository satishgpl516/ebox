import {USER} from "../constants";

export const signupReducer = (state = {}, action) => {
  switch (action.type) {
    case USER.SIGN_UP:
      return { ...state,
        data: state,
        isFetching: true
      };
    case USER.SIGNUP_SUCCESS:
      return { ...state,
        isFetching: false,
        data: action.payload // action.payload.data.d.results[0]
      };
    case USER.SIGNUP_FAIL:
      return { ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
};

export const signinReducer = (state = {
  isLogged: false
}, action) => {
  switch (action.type) {
    case USER.SIGN_IN:
      return { ...state,
        data: state,
        isFetching: true,
        isLoggedIn: false,
      };
    case USER.SIGN_OUT:
      return { ...state,
        data: state,
        isFetching: true,
        isLoggedIn: true,
      };
    case USER.SIGN_IN_SUCCESS:
      return { ...state,
        isFetching: false,
        isLoggedIn: true,
        data: action.payload // action.payload.data.d.results[0]
      };
    case USER.SIGN_IN_FAIL:
      return { ...state,
        isFetching: false,
        isLoggedIn: false,
        error: action.error
      };
    case USER.SIGN_OUT_SUCCESS:
    return {
      isFetching: false,
      isLoggedIn: false,
      data: state // action.payload.data.d.results[0]
    };
    default:
      return state;
  }
};

export const signoutReducer = (state = {}, action) => {
  switch (action.type) {
    case USER.SIGN_OUT:
      return { ...state,
        data: state,
        isFetching: true
      };
    case USER.SIGN_OUT_SUCCESS:
      return { ...state,
        isFetching: false,
        data: action.payload // action.payload.data.d.results[0]
      };
    case USER.SIGN_OUT_FAIL:
      return { ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
};
