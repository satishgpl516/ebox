import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {USER} from "../constants";
import {signinReducer,signupReducer} from './Signinreducer';
import {movieReducer} from "./MoviesReducer";


const rootReducer = combineReducers({
  user: signinReducer,
  moviesList: movieReducer,
  form: formReducer
});

export default rootReducer;
