import React,{Component} from 'react';
import {connect} from "react-redux";
import Logo from './Login/Logo.js';
import '../css/dashboard.css';
import {getAllMovies} from "../actions/MoviesActions";
import { FadeLoader } from 'react-spinners';
import FilterMovies from './FilterMovies';

import '../css/ImageCarousel.css';
import Header from "./Header";
import MoviesList from "./MoviesList";

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
  backgroundColor: 'white'
};

class BrowseMovies extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
  }
  componentDidMount(){
    this.props.getAllMovies().then( () => {
      this.setState({loading: false})
    });
  }
  render(){
    console.log(this.props.movies);
    const{movies} = this.props;
    return(
      <div>
     <Header/>
      <div style={{marginTop:'150px'}}>
        <FilterMovies/>
        {(movies) ? (
          <MoviesList title="Browse Movies" moviesList={movies}/>
        ): (
          <FadeLoader
            className={override}
            sizeUnit={"px"}
            size={150}
            color={'#123abc'}
            loading={this.state.loading}
          />
        )
        }
      </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    movies: state.moviesList.data
  }
}


export default connect(mapStateToProps,{getAllMovies})(BrowseMovies);
