import React, {Component} from 'react';
import "../css/ImageCarousel.css";
import "../css/dashboard.css"
class ImageCarousel extends Component {

  render(){
    return(
          <div className="tile">
            <div className="tile__media">
              <img className="tile__img" src={this.props.backdrop} alt=""/>
            </div>
            <div className="tile__details">
              <div className="tile__title">
                {this.props.title}
              </div>
            </div>
          </div>
    );
  }


}

export default ImageCarousel;




