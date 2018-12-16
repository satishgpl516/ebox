import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {USER} from "../constants";
import {signinReducer,signupReducer} from './Signinreducer';
import {movieReducer, movieDetailsReducer, movieOperationReducer,movieRatingsReducer} from "./MoviesReducer";
import {moviePaymentReducer, payUserSubscriptionReducer} from "./PaymentsReducer";
import {UserPaidMoviesReducer, getUserSubscription, setUserWatchLog} from "./UserReducer";

const rootReducer = combineReducers({
  userSignup : signupReducer,
  user: signinReducer,
  moviesList: movieReducer,
  movieDetails: movieDetailsReducer,
  movieOperation: movieOperationReducer,
  movieReviews: movieRatingsReducer,
  moviePaymentStatus: moviePaymentReducer,
  userSubscription: getUserSubscription,
  userPaidMovies: UserPaidMoviesReducer,
  setWatchLog: setUserWatchLog,
  subscriptionPaid: payUserSubscriptionReducer,
  form: formReducer
});

export default rootReducer;
