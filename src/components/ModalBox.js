import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import CardPayment from "./CardPayment";
import {connect} from 'react-redux';
import {getUserSubscription} from '../actions/UserActions';

const modalStyle = {
  backgroundColor: "black",
  width: '1200px',
  height: '800px'
};

export class ModalBox extends React.Component {
  state = {
    open: false,
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const{movie} = this.props;
    return (
      <div>
        <button onClick={this.onOpenModal} className="warning-btn">play movie</button>
        <Modal open={open} onClose={this.onCloseModal} center style={modalStyle}>
          <iframe width="1260" height="700" src={`${movie.movieurl}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
          </iframe>
        </Modal>
      </div>
    );
  }
}

class Payment extends React.Component {
  constructor(props){
    super(props);
  }

  state = {
    open: false,
  };
  componentDidMount(){
    let username = localStorage.getItem('user');
    // this.props.getUserSubscription(username);
  }

  getPrice = (price) => {
    return price;
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const{movie} = this.props;
    return (
      <div>
        <button onClick={this.onOpenModal} className="hello warning-btn">pay {this.getPrice(movie.price)}</button>
        <Modal open={open} onClose={this.onCloseModal} center style={modalStyle}>
          <h1 >Movie Payment</h1>
          <CardPayment price={movie.price}/>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    movieDetail: state.movieDetails.data
  }
}

export const PaymentModal = connect(mapStateToProps, {getUserSubscription}) (Payment);

