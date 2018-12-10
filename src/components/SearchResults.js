import React,{Component} from 'react';
import createReactClass from 'create-react-class';
import {connect} from "react-redux";
import Logo from './Login/Logo.js';
import '../css/dashboard.css';
import {getAllMovies} from "../actions/MoviesActions";
import {doSignout} from "../actions/LoginActions"
import {bindActionCreators} from "redux";
import {LOGO} from "../constants";
import {Dashboard, Navigation, TitleList, UserProfile} from "./Dashboard";

var SearchResults = createReactClass({
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
    console.log(this.props.user);
    return (
      <div>
        <header className="Header">
          {/*<Logo />*/}
          <img src={LOGO} width={'150px'} height={'50px'} alt="Entertainment Box"/>
          <Navigation />
          <div id="search" className="Search">
            <input onKeyUp={this.handleKeyUp} onChange={this.handleChange} type="search" placeholder="Search for a title..." value={this.state.searchTerm}/>
          </div>
          <UserProfile />
        </header>
        <TitleList title="Search Results" url={this.state.searchUrl} />
      </div>
    );
  }
});

function mapStateToProps(state){
  return{
    movies: state.moviesList,
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

