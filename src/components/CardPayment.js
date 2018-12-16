import React from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';
import Card from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import "../css/CreditCards.css"
import {payAmount,payUserSubscription} from "../actions/UserActions";
import {formatCreditCardNumber, formatCVC, formatExpirationDate, formatFormData,} from './CardsUtil';

class CardPayment extends React.Component {
  state = {
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null,
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {}
      );

    this.setState({ formData });
    let username = localStorage.getItem('user');
    if(this.props.subscription === 'PAY_PER_VIEW_ONLY'){
      this.props.payAmount(username, this.props.price, this.props.movieId, this.props.subscription, this.props.months);
    }
    if(this.props.subscription === 'SUBSCRIPTION_ONLY'){
      this.props.payUserSubscription(username, this.props.price, this.props.movieId, this.props.subscription, this.props.months);
    }
    this.form.reset();
  };

  payMovie = (username,price,subscription,months) => {
    this.props.payAmount(username,price,subscription,months);
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;
    const {price,movieId} = this.props;
    return (
      <div key="Payment" className="payment-div">
        <div className="App-payment">
          {/*<h1 >Movie Payment</h1>*/}
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form className='payment-form' ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
            <div className="payment-form-group">
              <input
                type="tel"
                name="number"
                className="payment-form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <small>E.g.: 49..., 51..., 36..., 37...</small>
            </div>
            <div className="payment-form-group">
              <input
                type="text"
                name="name"
                className="payment-form-control"
                placeholder="Name"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="row payment-card-row">
              <div className="column">
                <input
                  type="tel"
                  name="expiry"
                  className="payment-form-control-card"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="column">
                <input
                  type="tel"
                  name="cvc"
                  className="payment-form-control-card"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
            </div>
            <input type="hidden" name="issuer" value={issuer} />
            <div className="form-actions">
              <button className="btn warning-btn ">confirm Payment</button>
            </div>
          </form>
          {/*{formData && (*/}
            {/*<div className="App-highlight">*/}
              {/*{formatFormData(formData).map((d, i) => <div key={i}>{d}</div>)}*/}
            {/*</div>*/}
          {/*)}*/}
        </div>
      </div>
    );
  }
}

export default connect(null, {payAmount,payUserSubscription}) (CardPayment);
