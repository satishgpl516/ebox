import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import '../css/dashboard.css';
import MovieItem from "./MovieItem";

const  apiKey = '87dfa1c669eea853da609d4968d294be';

class MoviesList extends Component{
  constructor(props){
    super(props);
    this.state = {data: [], mounted: false};
  }
  loadContent() {
    var requestUrl = 'https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&page=1&api_key=' + apiKey;
    fetch(requestUrl).then((response)=>{
      return response.json();
    }).then((data)=>{
      this.setState({data : data});
    }).catch((err)=>{
      console.log("There has been an error");
    });
  }
  componentWillReceiveProps(nextProps){
      this.setState({mounted:true});

  }
  renderList(moviesList, title){
    return(
      <div ref="titlecategory" className="TitleList" data-loaded={this.state.mounted}>
        <div className="Title">
          <h1>{title}</h1>
          <h2> Add a drop down for filter </h2>
          <div className="titles-wrapper">
          {moviesList.map((item, idx) =>
            <MovieItem key={idx} movie={item}/>
          )
          }
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
      this.setState({mounted:true});
  }
  render(){
    const{moviesList, title}= this.props;
    return (
      <div>
        {  (moviesList && moviesList.length > 0) ? this.renderList(moviesList, title) : ''}
      </div>
    );
  }
}

export default MoviesList;
