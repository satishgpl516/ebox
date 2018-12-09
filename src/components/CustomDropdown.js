import React, { Component } from 'react';
import usersvg from "../img/user-solid.svg";
import {Link} from 'react-router-dom';
import {doSignout} from ''
class CustomDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {

    if (!this.dropdownMenu.contains(event.target)) {

      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });

    }
  }

  handleSignout(){
    this.props.doSignout();
  }

  render() {
    return (
      <div>
        <button onClick={this.showMenu}>
          <img src={usersvg} className="user-profile-svg" alt="profile" />
        </button>

        {
          this.state.showMenu
            ? (
              <div
                className="menu"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                <Link> <button> Account</button></Link>
                <button onClick={this.handleSignout}> Signout </button>
                <button> Menu item 3 </button>
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}

export default CustomDropdown;
