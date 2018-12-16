import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {LOGO} from "../../constants";
import {addMovie, updateMovie, getMovieDetails} from "../../actions/MoviesActions";
import '../../css/Movieadd.css'
import Header from "../Header";

let isEdit = false;
class MovieAdd extends Component {
  constructor(props){
    super(props);
    this.state = {
      movieId : '',
    };
  }

  componentDidMount(){
  isEdit = (window.location.href).includes('edit-movie');
    if(isEdit){
      let movieId = window.location.href.split('/')[4]
      console.log(movieId,window.location.href );
      this.props.getMovieDetails(movieId);
    }
  }

  renderField(field) {
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

  onSubmit(values) {
    console.log(values);
    isEdit ? this.props.updateMovie(values, this.props.movie.movieId): this.props.addMovie(values);
  }

  render() {
    const {handleSubmit, movie, id, initialValues, load, pristine, reset, submitting} = this.props;
    console.log(movie, initialValues, id);
    if(movie !== undefined || isEdit == false){
      return (
        <div>
          <Header/>
          <div style={{marginTop: '100px'}}>
            <div className="movieadd-body">
              <div className="movie-add-container">
                {(isEdit) ? ( <h1>Edit Movie</h1>): ( <h1>Add Movie</h1>)}
                  <div id='addMovieHalls' className='medium-8 columns col-md-offset-1'>
                    <form className="registration-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                      <div className='form-group'>
                        {/* Movie Theater Name */}
                        <label className="form-label">Movie Title</label>
                        <Field name="title"
                               className="addmovie-text"
                               id="MovieTitle"
                               type='text'
                               placeholder = 'Movie Title'
                               component={this.renderField}
                        />
                        <label className="form-label">Movie Year</label>
                        <Field name="year"
                               className="addmovie-text"
                               id="MovieYear"
                               type='text'
                               component={this.renderField}
                        />
                        <label className="form-label">Movie Type</label>
                        <Field name="availability" component={this.renderSelect}
                               className="signin-dropdown">
                          <option></option>
                          <option value="PAID">Paid</option>
                          <option value="FREE">Free</option>
                          <option value="SUBSCRIPTION_ONLY">Subscription Only</option>
                          <option value="PAY_PER_VIEW_ONLY">Pay Per View Only</option>
                        </Field>

                        <label className="form-label">Director</label>
                        <Field name="moviedirector"
                               className="addmovie-text"
                               id="Moviedirector"
                               type='text'
                               component={this.renderField}
                        />
                        <label className="form-label">Actors</label>
                        <Field name="actors"
                               className="addmovie-text"
                               id="actors"
                               type='text'
                               placeholder='Enter Actors names with comma seperated values'
                               component={this.renderField}
                        />
                        <label className="form-label">Movie Url</label>
                        <Field name="movieurl"
                               className="addmovie-text"
                               id="movieurl"
                               type='text'
                               component={this.renderField}
                        />
                        <div>
                          <label className="form-label">Price</label>
                          <Field name="price"
                                 className="addmovie-text"
                                 id="price"
                                 type='text'
                                 value='0'
                                 component={this.renderField}
                          />
                        </div>
                        <label className="form-label">Mpaa Rating</label>
                        <Field name="mpparating" component={this.renderSelect}
                               className="signin-dropdown">
                          <option></option>
                          <option value="G">G – General Audiences</option>
                          <option value="PG">PG – Parental Guidance Suggested</option>
                          <option value="PG-13">PG-13 – Parents Strongly Cautioned</option>
                          <option value="NC-17">NC-17 – Adults Only</option>
                        </Field>
                        {/* City */}
                        <label className="form-label">Synopsis</label>
                        <Field name="synopsis"
                               className="addmovie-text"
                               id="Synopsis"
                               type='text'
                               component={this.renderField}
                        />

                        {/* State - Dropdown */}
                        <label className="form-label">Country</label>
                        <Field name="country"
                               className="addmovie-text"
                               id="country"
                               type='text'
                               component={this.renderField}
                        />
                        {/* ZIPCODE */}
                        <label className="form-label">genre</label>
                        <Field name="genre"
                               className="addmovie-text"
                               id="genre"
                               type='text'
                               component={this.renderField}
                        />

                        {/* Hall Owner - firstname */}
                        <label className="form-label">image</label>
                        <Field name="image"
                               className="addmovie-text"
                               id="image"
                               type='text'
                               component={this.renderField}
                        />
                        {/* Hall Owner -lastname */}
                        <label className="form-label">Studio</label>
                        <Field name="studio"
                               className="addmovie-text"
                               id="studio"
                               type='text'
                               component={this.renderField}
                        />
                        {/* Hall Owner -emailID */}
                        <div className="form-group">
                            {(isEdit) ? (
                              <button id="registration-form-submit" className="movieadd-btn">
                                UPDATE MOVIE</button>):
                              ( <button className="movieadd-btn">ADD MOVIE</button>)}
                        </div>
                      </div>
                    </form>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    else{
      return(
      <div>Loading State</div>
      );
    }
  }
}

function validate(values) {
  const errors = {};
  let regEx_zipcode = RegExp('^[0-9]{5}(?:-[0-9]{4})?$');
  //validate input from value

  if (!values.title) {
    errors.title = "Please enter Movie Name\n ";
  }
  if ((!values.year)) {
    errors.year = "Please enter a movie year\n ";
  }

  if ((values.year)) {
    if (isNaN(values.year)) {
      errors.year = "Please enter a Integer value for year\n ";
    }
  }

  if (!values.availability) {
    errors.availability = "Please enter a movie type as paid or Free\n";
  }
  if (!values.moviedirector) {
    errors.moviedirector = "Please enter a movie director\n";
  }

  if (!values.actors) {
    errors.actors = 'Enter aleast one actor\n';
  }
  if ((!values.price) && (values.availability === 'free')) {
    values.price = 0
  }
  if ((!values.price) && (values.availability === 'paid')) {
    errors.price = 'Enter a price for the movie'
  }
  if (!values.mpparating) {
    errors.mpparating = 'Enter Mpaa Rating for the movie\n';
  }
  if (!values.country) {
    errors.country = 'Enter country for the movie\n';
  }
  if (!values.genre) {
    errors.genre = 'Enter genre for the movie\n';
  }
  if (!values.image) {
    errors.genre = 'Enter image url for the movie\n';
  }
  if ((!values.synopsis)) {
    errors.synopsis = 'Enter Synopsis the movie\n';
  }
  if (values.synopsis && (values.synopsis.length > 2000)) {
    errors.synopsis = 'Synopsis should be less than 2000 chars the movie\n';
  }
  if (!values.genre) {
    errors.genre = 'Enter genre for the movie\n';
  }
  if ((values.actors)) {
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?]/;
    // if ((values.actors.includes(','))) {
    // values.actors = [values.actors.toString()]
    if (format.test(values.actors)) {
      errors.actors = 'Actors value has illegal characters special characters'
    }
    else {
    }
  }
  if(!values.movieurl) {
    errors.movieurl = 'Enter video Link for the movie\n';
  }
  //if errors is empty , the form is fine to submit
  //if errors has *any* properties, redux form assumes that form is invalid
  return errors;
}



function mapStateToProps(state) {
  return {
  movie : state.movieDetails && state.movieDetails.data,
    initialValues:{
      title: (state.movieDetails.data && state.movieDetails.data.title) || " ",
      year:state.movieDetails.data && state.movieDetails.data.year ||" ",
      availability:state.movieDetails.data && state.movieDetails.data.availability || '',
      moviedirector:state.movieDetails.data && state.movieDetails.data.directorName || '',
      actors:state.movieDetails.data && state.movieDetails.data.actors || '',
      price:state.movieDetails.data && state.movieDetails.data.price || '',
      mpparating:state.movieDetails.data && state.movieDetails.data.mpaarating || '',
      country:state.movieDetails.data && state.movieDetails.data.country || '',
      genre:state.movieDetails.data && state.movieDetails.data.genre || '',
      image:state.movieDetails.data && state.movieDetails.data.image || '',
      synopsis:state.movieDetails.data && state.movieDetails.data.synopsis || '',
      movieurl:state.movieDetails.data && state.movieDetails.data.movieurl || '',
      // keyword3:state.movieDetails && state.movieDetails.keyword.keyword3 || '',
      // keyword4:state.movieDetails && state.movieDetails.keyword.keyword4 || '',
      // keyword5:state.movieDetails && state.movieDetails.keyword.keyword5 || '',
      // keyword6:state.movieDetails && state.movieDetails.keyword.keyword6 || '',
      // keyword7:state.movieDetails && state.movieDetails.keyword.keyword7 || '',
      // keyword8:state.movieDetails && state.movieDetails.keyword.keyword8 || '',
      // keyword9:state.movieDetails && state.movieDetails.keyword.keyword9 || '',
      // keyword10:state.movieDetails && state.movieDetails.keyword.keyword10 || '',
      // authors:state.movieDetails && state.movieDetails.authors || '',
      // abstract:state.movieDetails && state.movieDetails.abstract || '',
      // snippet:state.movieDetails && state.movieDetails.snippet || '',
      // link:state.movieDetails && state.movieDetails.link || '',
    }

  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      addMovie, updateMovie, getMovieDetails
    }, dispatch)
  };
}


MovieAdd = reduxForm({form: 'addForm', enableReinitialize: true})(MovieAdd);
export default MovieAdd =  connect(mapStateToProps, mapDispatchToProps)(MovieAdd);
