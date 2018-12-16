import {PAYMENT} from "../constants";

export const moviePaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT.PAY_FOR_MOVIE:
      return { ...state,
        data: state,
        isFetching: true
      };
    case PAYMENT.PAY_FOR_MOVIE_SUCCESS:
      console.log("Hello", action);
      return { ...state,
        isFetching: false,
        data: action.payload // action.payload.data.d.results[0]
      };
    case PAYMENT.PAY_FOR_MOVIE_FAIL:
      return { ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
};

export const payUserSubscriptionReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT.PAY_USER_SUBSCRIPTION:
      return { ...state,
        data: state,
        isFetching: true
      };
    case PAYMENT.PAY_USER_SUBSCRIPTION_SUCCESS:
      return { ...state,
        isFetching: false,
        data: action.payload // action.payload.data.d.results[0]
      };
    case PAYMENT.PAY_USER_SUBSCRIPTION_FAILURE:
      return { ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
};

