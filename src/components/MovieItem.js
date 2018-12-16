import React, {Component} from 'react';
import "../css/ImageCarousel.css";
import {Link} from 'react-router-dom';
import "../css/dashboard.css"
class MovieItem extends Component {

  render(){
    const {movie} = this.props;
    console.log(movie);
    return(
      <div key={movie.movieId+"-Item"} className="Item" style={{backgroundImage: 'url(' + movie.image + ')'}} >
        <div key={movie.movieId+"-overlay"} className="overlay">
          <Link key={movie.movieId+""} to={`/moviedetails/${movie.movieId}`}>
          <div className="title__title" key={movie.movieId+"-title"}>{movie.title}</div>
          <div className="plot" key={movie.movieId+"-plot"}>{movie.synopsis}</div>
          </Link>
        </div>
      </div>
    );
  }


}

export default MovieItem;




