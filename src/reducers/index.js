import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {USER} from "../constants";
import {signinReducer,signupReducer} from './Signinreducer';
import {movieReducer, movieDetailsReducer, movieOperationReducer,movieRatingsReducer} from "./MoviesReducer";
import {moviePaymentReducer, payUserSubscriptionReducer} from "./PaymentsReducer";
import {getUserSubscription, getUserPayPerViewMovies} from "../actions/UserActions";

const rootReducer = combineReducers({
  userSignup : signupReducer,
  user: signinReducer,
  moviesList: movieReducer,
  movieDetails: movieDetailsReducer,
  movieOperation: movieOperationReducer,
  movieReviews: movieRatingsReducer,
  moviePaymentStatus: moviePaymentReducer,
  userSubscription: getUserSubscription,
  userPaidMovies: getUserPayPerViewMovies,
  subscriptionPaid: payUserSubscriptionReducer,
  form: formReducer
});

export default rootReducer;
