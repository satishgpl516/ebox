import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {LOGO} from "../constants";
import '../css/dashboard.css';
import Navigation from "./Navigation";
import UserProfile from "./UserProfile";
import {Link} from "react-router-dom";
import MoviesList from "./MoviesList";

class Header extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchTerm:"",
      searchUrl:""
    }
  }
  handleKeyUp(e){
    if (e.key === 'Enter' && this.state.searchTerm !== '') {
      var searchUrl = "search/multi?query=" + this.state.searchTerm + "&api_key=" + this.apiKey;
      this.setState({searchUrl:searchUrl});
    }
  }
  handleChange(e){
    this.setState({searchTerm : e.target.value});
  }
  render(){
    return(
      <header className="Header">
        {/*<Logo />*/}
        <Link to="/browsemovies">
        <img src={LOGO} width={'150px'} height={'50px'} alt="Entertainment Box"/>
        </Link>
        <Navigation />
        <div id="search" className="Search">
          <input onKeyUp={this.handleKeyUp} onChange={this.handleChange} type="search" placeholder="Search for a title..." value={this.state.searchTerm}/>
        </div>
        <UserProfile/>
      </header>
    );
  }
}

export default Header;
