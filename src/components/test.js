import React,{Component} from 'react';
import createReactClass from 'create-react-class';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Logo from './Login/Logo.js';
import '../css/dashboard.css';
import {getAllMovies} from "../actions/MoviesActions";
import {doSignout} from "../actions/SigninActions"
import {bindActionCreators} from "redux";
import {LOGO} from "../constants";
import usersvg from "../img/user-solid.svg"
import MovieItem from "./MovieItem";
import Header from "./Header";
import MoviesList from "./MoviesList";

/////////////////
/// COMPONENTS //
/////////////////

// Container
var test = createReactClass({
  apiKey: '87dfa1c669eea853da609d4968d294be',
  getInitialState: function() {
    return {searchTerm:"", searchUrl:""};
  },
  handleKeyUp :function(e){
    if (e.key === 'Enter' && this.state.searchTerm !== '') {
      var searchUrl = "search/multi?query=" + this.state.searchTerm + "&api_key=" + this.apiKey;
      this.setState({searchUrl:searchUrl});
    }
  },

  handleChange : function(e){
    this.setState({searchTerm : e.target.value});
  },
  render: function() {
    return (
      <div>
       <Header/>
        {/*<TitleList title="Search Results" url={this.state.searchUrl} />*/}
        <TitleList title="Top TV picks for Jack" url='discover/tv?sort_by=popularity.desc&page=1' />
        <MoviesList />
        {/*<TitleList title="Trending now" url='discover/movie?sort_by=popularity.desc&page=1' />*/}
        {/*<TitleList title="Most watched in Horror" url='genre/27/movies?sort_by=popularity.desc&page=1' />*/}
        {/*<TitleList title="Sci-Fi greats" url='genre/878/movies?sort_by=popularity.desc&page=1' />*/}
        {/*<TitleList title="Comedy magic" url='genre/35/movies?sort_by=popularity.desc&page=1' />*/}
      </div>
    );
  }
});


// Navigation
var Navigation = createReactClass({
  render: function() {
    return (
      <div id="navigation" className="Navigation">
        <nav>
          <ul>
            <li>Browse</li>
            <li>My list</li>
            <li>Top picks</li>
            <li>Recent</li>
          </ul>
        </nav>
      </div>
    );
  }
});



////////////////
// Title List //
////////////////

// Title List Container

var TitleList = createReactClass({

  apiKey: '87dfa1c669eea853da609d4968d294be',
  getInitialState: function() {
    return {data: [], mounted: false};
  },
  loadContent: function() {
    var requestUrl = 'https://api.themoviedb.org/3/' + this.props.url + '&api_key=' + this.apiKey;
    fetch(requestUrl).then((response)=>{
      return response.json();
    }).then((data)=>{
      this.setState({data : data});
    }).catch((err)=>{
      console.log("There has been an error");
    });
  },
  componentWillReceiveProps : function(nextProps){
    if(nextProps.url !== this.props.url && nextProps.url !== ''){
      this.setState({mounted:true,url:nextProps.url},()=>{
        this.loadContent();
      });

    }
  },
  componentDidMount: function() {
    if(this.props.url !== ''){
      this.loadContent();
      this.setState({mounted:true});
    }

  },
  render: function() {
    var titles ='';
    if(this.state.data.results) {
      titles = this.state.data.results.map(function(title, i) {
        if(i < 20) {
          var name = '';
          var backDrop = 'http://image.tmdb.org/t/p/original' + title.backdrop_path;
          if(!title.name) {
            name = title.original_title;
          } else {
            name = title.name;
          }

          return (
            <Item key={title.id} title={name} score={title.vote_average} overview={title.overview} backdrop={backDrop} />
          );

        }else{
          return (<div key={title.id}></div>);
        }
      });

    }

    return (
      <div ref="titlecategory" className="TitleList" data-loaded={this.state.mounted}>
        <div className="Title">
          <h1>{this.props.title}</h1>
          <div className="titles-wrapper">
            {titles}
          </div>
        </div>
      </div>
    );
  }
});

// Title List Item
var Item = createReactClass({
  render: function() {
    return (
      <div className="Item" style={{backgroundImage: 'url(' + this.props.backdrop + ')'}} >
        <div className="overlay">
          <div className="title">{this.props.title}</div>
          <div className="rating">{this.props.score} / 10</div>
          <div className="plot">{this.props.overview}</div>
        </div>
      </div>
    );
  }
});


export default test;
