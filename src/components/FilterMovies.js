import React,{Component} from 'react';
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import '../css/BrowseMovies.css';
import {getAllMovies, updateFilteredMovies} from "../actions/MoviesActions";
import _ from "lodash";

class FilterMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: null,
      directors: null,
      actors: null,
      genre: null,
      mpaaRating: null
    };
    this.filterMovieData= this.filterMovieData.bind(this);
  }


  renderField(field){
    const {input, meta: {touched, error, disabled}} = field;
    const cname = `form-group ${touched && error  ? 'has-danger' : ''} `;

    return (
      <div className={cname}>
        {/*<label>{field.label}</label>*/}
        <input className="form-control large-input"
               {...input} {...field}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  renderSelect(field){
    return(
      <div>
        <select {...field.input} {...field}/>
        {field.touched && field.error && <div className="error">{field.error}</div>}
      </div>
    );
  }

  filterMovieData(values) {
    const {movies} = this.props;
    if (movies) {
      let filteredData = movies;
      if (values.title) {
        filteredData = _.filter(movies, {title: values.title});
      }
      if (values.year) {        filteredData = _.filter(movies, {year: values.year});}
      if (values.genre) {        filteredData = _.filter(movies, {genre: values.genre});}
      if (values.moviedirector) {    filteredData = _.filter(movies, {directorName: values.moviedirector});}
      if (values.actors) {    filteredData = _.filter(movies, {actors: values.actors});}
      if (values.mpparating) {    filteredData = _.filter(movies, {mpparating: values.mpparating});}
    this.props.updateFilteredMovies(filteredData);
    }
  }

  onSubmit(values) {
    console.log(values);
    // this.filterMovieData(values);
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <div className="filter-movies">
        <form className="registration-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className='filter-group'>
            {/* Movie Theater Name */}
            <div className="form-itemgroup">
            <label className="filterfilterform-label">Movie Title</label>
            <Field name="title"
                   className="filtermovie-text"
                   id="MovieTitle"
                   type='text'
                   placeholder = 'Movie Title'
                   component={this.renderField}
            />
            </div>
            <div className="form-itemgroup">
            <label className="filterform-label">Movie Year</label>
            <Field name="year"
                   className="filtermovie-text"
                   id="MovieYear"
                   type='text'
                   component={this.renderField}
            />
            </div>
            <div className="form-itemgroup">
              <label className="filterform-label">genre</label>
              <Field name="genre"
                     className="filtermovie-text"
                     id="genre"
                     type='text'
                     component={this.renderField}
              />
            </div>
            <div className="form-itemgroup">
            <label className="filterform-label">Director</label>
            <Field name="moviedirector"
                   className="filtermovie-text"
                   id="Moviedirector"
                   type='text'
                   component={this.renderField}
            />
            </div>
            <div className="form-itemgroup">
            <label className="filterform-label">Actors</label>
            <Field name="actors"
                   className="filtermovie-text"
                   id="actors"
                   type='text'
                   placeholder='Enter Actors names with comma seperated values'
                   component={this.renderField}
            />
            </div>
            <div className="form-itemgroup">
            <label className="filterform-label">Mpaa Rating</label>
            <Field name="mpparating" component={this.renderSelect}
                   className="filter-dropdown">
              <option></option>
              <option value="G">G – General Audiences</option>
              <option value="PG">PG – Parental Guidance Suggested</option>
              <option value="PG-13">PG-13 – Parents Strongly Cautioned</option>
              <option value="NC-17">NC-17 – Adults Only</option>
            </Field>
            </div>
            <button className="filter-btn">FILTER</button>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if ((values.year)) {
    if (isNaN(values.year)) {
      errors.year = "Enter a 4 digit value \n ";
    }
  }
  if (!values.availability) {
    errors.availability = "Please enter a movie type as paid or Free\n";
  }
  return errors;
}


function mapStateToProps(state){
  return{
    movies: state.moviesList.data
  }
}


export default reduxForm({
  validate,
  form: 'Filtermovies'})(connect(mapStateToProps,{getAllMovies, updateFilteredMovies})(FilterMovies));
