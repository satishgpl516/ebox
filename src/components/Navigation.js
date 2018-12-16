import React,{Component} from "react";

const navList = {
  fontSize: '18px',
  color: 'white'
};
class Navigation extends Component{
  constructor(props){
    super(props);
    this.checkUserisAdmin = this.checkUserisAdmin.bind(this);
  }

  checkUserisAdmin() {
    let user = localStorage.getItem('user');
    console.log("user email", user);
    return (user && user.includes('@sjsu.edu'));
  }

  render(){
    if(this.checkUserisAdmin()){
      return(
        <div id="navigation" className="Navigation">
          <nav>
            <ul>
              <li><a href="/addmovie">Add Movie</a></li>
              <li><a href="#">Users</a></li>
              <li><a href="#">Reports</a></li>
            </ul>
          </nav>
        </div>
      );
    }
    else{
      return (
        <div id="navigation" className="Navigation">
          <nav>
            <ul>
              <li><a style={navList} href="/browsemovies">browse Movies</a></li>
              <li><a style={navList} href="#">Watch History</a></li>
              <li><a style={navList} href="#">Paid Movies</a></li>
            </ul>
          </nav>
        </div>
      )
    }
  }
}

export default Navigation;
