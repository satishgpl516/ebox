import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import CardPayment from "./CardPayment";
import {connect} from 'react-redux';
import {getUserSubscription,setUserWatchLog} from '../actions/UserActions';


const modalStyle = {
  backgroundColor: "black",
  width: '1200px',
  height: '800px'
};

class ModalDiv extends React.Component {
  state = {
    open: false,
  };

  onOpenModal = () => {
    this.setState({ open: true });
    let user = localStorage.getItem('user');
    console.log("this movie");
    this.props.setUserWatchLog(user, this.props.movie.movieId);
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const{movie, setUserWatchLog} = this.props;
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
function mapStateToProps(state){
  return{
    userSubscription: state.userSubscription.data,
    setUserWatchLog: state.setWatchLog.data

  }
}
export const ModalBox = connect(mapStateToProps,{setUserWatchLog})(ModalDiv);

class Payment extends React.Component {
  constructor(props){
    super(props);
  }

  state = {
    open: false,
  };
  async componentDidMount(){
    let username = localStorage.getItem('user');
    await this.props.getUserSubscription(username);
  }

  getPrice = (price) => {
    const {userSubscription} = this.props;
    console.log(userSubscription);
    if (userSubscription) return price/2;
    else return price;
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const{movie, userSubscription} = this.props;
    return (
      <div>
        <button onClick={this.onOpenModal} className="hello warning-btn">pay {this.getPrice(movie.price)}</button>
        <Modal open={open} onClose={this.onCloseModal} center style={modalStyle}>
          <h1 >Movie Payment</h1>
          <CardPayment movieId= {movie.movieId} months={12} price={movie.price} subscription={"PAY_PER_VIEW_ONLY"}/>
        </Modal>
      </div>
    );
  }
}




export const PaymentModal = connect(mapStateToProps, {getUserSubscription}) (Payment);

