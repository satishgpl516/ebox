import React,{Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import '../css/dashboard.css';
import {getMovieDetails, deleteMovie} from "../actions/MoviesActions";
import Header from "./Header";
import {Button, ButtonToolbar} from 'react-bootstrap';
import "../css/MovieDetails.css";
import {ModalBox, PaymentModal} from "./ModalBox";
import {Link} from "react-router-dom";
import { reduxForm, Field} from "redux-form";
import MovieReview from "./MovieReview";
import ReactStars from 'react-stars';
import _ from "lodash";
import moment from "moment";
import {getUserPayPerViewMovies} from "../actions/UserActions";


class MovieDetails extends Component{
  constructor(props){
    super(props);
    this.state = {data: [], mounted: false, movieId: this.props.id, showMovie: false , showPayment: false};
    this.validatePlayOption = this.validatePlayOption.bind(this);
    this.showTrailer = this.showTrailer.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.checkUserisAdmin = this.checkUserisAdmin.bind(this);
  }
  async componentDidMount(){
    await this.props.getMovieDetails(this.state.movieId);
    let user = localStorage.getItem('user');
    await this.props.getUserPayPerViewMovies(user);
  }
  checkUserisAdmin() {
    let user = localStorage.getItem('user');
    console.log("user email", user);
    return (user.includes('@sjsu.edu'));
  }
  validatePlayOption(availablity, price, movieId){
    const{paidMovies} = this.props;
    console.log(paidMovies);
    if(this.checkUserisAdmin() || availablity === 'FREE')
      return true;
    else if(paidMovies && paidMovies.length){
      if(paidMovies.includes(movieId)){
        return true;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
  }

  showTrailer(){

  }
  deleteMovie(){
    this.props.deleteMovie(this.state.movieId);
  }

  renderDetails(movieDetail){
    let movieClose = () => this.setState({ showMovie: false });
    let paymentClose = () => this.setState({ showPayment: false });
    let playMovie = this.validatePlayOption(movieDetail.availability, movieDetail.price, movieDetail.movieId);
    console.log(playMovie);
    return(
      <div className="movie-detail">
        <div>
          <img className="movie-detail-image" src={`${movieDetail.image}`} alt="image"/>
        </div>
        <div className='movie-details-desc'>
          <h1>{movieDetail.title}</h1>
          <h1 className="rateNumber">6.5</h1>
          <h2>Description: </h2>
          <div className="description-div">{movieDetail.synopsis}</div>
          <h2>Genres: </h2>
          <div className="description-div">{movieDetail.genre}</div>
          <h2>Director:</h2>
          <div className="description-div">{movieDetail.directorName}</div>
          {/*<h3>actors: {movieDetail.actors.join(',')}</h3>*/}
          <h2>Actors:</h2>
          <div className="description-div">{ (movieDetail.actors !== undefined ) ? movieDetail.actors.toString() : movieDetail.actors }</div>
          {(playMovie) && <ModalBox movie={movieDetail} show={this.state.showMovie} onHide={movieClose} /> }
          {this.checkUserisAdmin() ?  (
            <div>
            <button className="warning-btn">
              <Link to= {`/edit-movie/${movieDetail.movieId}`}>Edit Movie</Link>
            </button>
            <button onClick={this.deleteMovie} className="warning-btn">Delete Movie</button>
            </div>
          ): (<div></div>)
          }
          {/*{(moviePrice ===0) && <button onClick={this.showPayment(movieDetail)} className="warning-btn">*/}
            {/*pay ${moviePrice} USD</button>*/}
          {/*}*/}
          {
            (!playMovie) && <PaymentModal movie = {movieDetail}/>
          }
        </div>
      </div>
    );
  }
  render(){
    const{movieDetail, title}= this.props;
    console.log(movieDetail);
    return (
      <div>
        <Header/>
        <div style={{marginTop:'100px'}}>
          {  (movieDetail) ? this.renderDetails(movieDetail) : ''}
          {/*{ (movieDetail) ? <MovieReview movie={movieDetail}/>: ''}*/}
        </div>
      </div>
    );
  }
}


function validate(values) {
  const errors = {};

  if (!values.projectName) {
    errors.projectName = "Please enter a Title";
  }

  if (values.projDesc) {
    if (values.projDesc.length < 10) {
      errors.projDesc = "Body should contain more than 10 letters";
    }
  }
  return errors;
}

function mapStateToProps(state){
  return{
    movieDetail: state.movieDetails.data,
    movieReview: state.movieReviews.data,
    paidMovies : state.userPaidMovies.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      getMovieDetails, deleteMovie, getUserPayPerViewMovies
    }, dispatch)
  }
}

export default reduxForm({
  validate,
  form: 'reviewForm',
})(
  connect(mapStateToProps,mapDispatchToProps)(MovieDetails)
);
