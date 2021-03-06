import React,{Component} from 'react';
import createReactClass from 'create-react-class';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import '../css/dashboard.css';
import {getAllMovies} from "../actions/MoviesActions";
import {doSignout} from "../actions/SigninActions"
import {bindActionCreators} from "redux";
import {LOGO} from "../constants";
import '../css/ImageCarousel.css';
import UserProfile from "./UserProfile";
/////////////////
/// COMPONENTS //
/////////////////

// Container
var Dashboard = createReactClass({
  apiKey: '87dfa1c669eea853da609d4968d294be',
  getInitialState: function() {
    return {searchTerm:"", searchUrl:""};
  },
  componentDidMount: function(){
    this.props.getAllMovies();
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
    console.log('logging in dash');
    console.log(this.props.user.data);
    // console.log(this.props.user.data.email.includes('@sjsu.edu'));
    return (
      <div>
        <header className="Header">
          {/*<Logo />*/}
          <img src={LOGO} width={'150px'} height={'50px'} alt="Entertainment Box"/>
          <Navigation />
          <div id="search" className="Search">
            <input onKeyUp={this.handleKeyUp} onChange={this.handleChange} type="search" placeholder="Search for a title..." value={this.state.searchTerm}/>
          </div>
         <UserProfile/>
        </header>
        {/*<Hero />*/}
        <TitleList title={`Search Results for "${this.state.searchTerm}"`} url={this.state.searchUrl} />
        <TitleList title="Top TV picks" url='discover/tv?sort_by=popularity.desc&page=1' />
        <TitleList title="Trending now" url='discover/movie?sort_by=popularity.desc&page=1' />
        <TitleList title="Most watched" url='genre/27/movies?sort_by=popularity.desc&page=1' />
        {/* <TitleList title="Sci-Fi greats" url='genre/878/movies?sort_by=popularity.desc&page=1' /> */}
        {/* <TitleList title="Comedy magic" url='genre/35/movies?sort_by=popularity.desc&page=1' /> */}
      </div>
    );
  }
});


// Navigation
export const Navigation = createReactClass({
  render() {
    return (

      <div id="navigation" className="Navigation">
        <nav>
          <ul>
            <li><a href="/movieadd">Add Movie</a></li>
            <li><a href="#">Users</a></li>
            <li><a href="#">Reports</a></li>
          </ul>
        </nav>
      </div>
    );
  }
});


//////////
// Hero //
//////////

var Hero = createReactClass({
  render: function() {
    return (
      <div id="hero" className="Hero" style={{backgroundImage: 'url(https://images.alphacoders.com/633/633643.jpg)'}}>
        <div className="content">
          <img className="logo" src="http://www.returndates.com/backgrounds/narcos.logo.png" alt="narcos background" />
          <h2>Season 2 now available</h2>
          <p>Movie Box chronicles the rise of the cocaine trade in Colombia and the gripping real-life stories of drug kingpins of the late '80s in this raw, gritty original series. Also detailed are the actions taken by law enforcement as they battle in the war on drugs, targeting notorious and powerful figures that include drug lord Pablo Escobar. As efforts are made to control cocaine, one of the world's most valuable commodities, the many entities involved -- legal, political, police, military and civilian -- find themselves in conflict.</p>
          <div className="button-wrapper">
            <HeroButton primary={true} text="Watch now" />
            <HeroButton primary={false} text="+ My list" />
          </div>
        </div>
        <div className="overlay"></div>
      </div>
    );
  }
});

// Hero Button
var HeroButton = createReactClass({
  render: function() {
    return (
      <a href="#" className="Button" data-primary={this.props.primary}>{this.props.text}</a>
    );
  }
});

////////////////
// Title List //
////////////////

// Title List Container

export var TitleList = createReactClass({

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
        if(i < 10) {
          var name = '';
          var backDrop = 'http://image.tmdb.org/t/p/original' + title.backdrop_path;
          if(!title.name) {
            name = title.original_title;
          } else {
            name = title.name;
          }

          return (
            <CarousalItem key={title.id} title={name} score={title.vote_average} overview={title.overview} backdrop={backDrop}/>
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
          {/*Insert the Explore All Button here*/}
          <div className="titles-wrapper">
              <div className="row" id="movie-scroll-bar">
                <div className="row__inner">
                   {titles}
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
});

var CarousalItem = createReactClass({
  render: function() {
    return (
      <div className="tile">
        <div className="tile__media">
          <Link to ="/movieDetail/{}">
            <img className="tile__img" src={this.props.backdrop} alt=""/>
          </Link>
        </div>
        <div className="">
          <div className="tile__title">
            {this.props.title}
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
          <ListToggle />
        </div>
      </div>
    );
  }
});

// ListToggle
var ListToggle = createReactClass({
  getInitialState: function() {
    return({ toggled: false })
  },
  handleClick: function() {
    if(this.state.toggled === true) {
      this.setState({ toggled: false });
    } else {
      this.setState({ toggled: true });
    }

  },
  render: function() {
    return (
      <div onClick={this.handleClick} data-toggled={this.state.toggled} className="ListToggle">
        <div>
          <i className="fa fa-fw fa-plus"></i>
          <i className="fa fa-fw fa-check"></i>
        </div>
      </div>
    );
  }
});

function mapStateToProps(state){
  return{
    movies: state.moviesList,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      getAllMovies
    }, dispatch)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
