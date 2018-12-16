import React,{Component} from 'react';
import {connect} from "react-redux";
import '../../css/BrowseMovies.css';
import {Field, reduxForm} from "redux-form";
import Header from "../Header";
import CardPayment from "../CardPayment";
import {payAmount} from "../../actions/UserActions";

class UserSubscription extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      months : 0
    };
    this.renderSelect = this.renderSelect.bind(this);
  }
  componentDidMount(){
  }

  renderSelect(field){
    console.log("inside select", field.input.value);
    if(this.state.months !== field.input.value){
      this.setState({months:field.input.value});
    }
    return(
      <div>
        <select {...field.input} {...field}/>
        {field.touched && field.error && <div className="error">{field.error}</div>}
      </div>
    );
  }

  onSubmit(values) {
    console.log(values);
  }

  render(){

    const{handleSubmit} = this.props;
    return(
      <div>
        <div style={{marginTop: "150px"}}>
        <Header/>
        <form className="registration-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className='filter-group' style={{marginLeft:"200px"}}>
            {/* Movie Theater Name */}
            <div className="form-itemgroup">
              <label className="filterform-label">Select a Plan</label>
              <Field name="subscriptionPlan" component={this.renderSelect}
                     className="filter-dropdown" >
                <option></option>
                <option value="1">One Month - $10</option>
                <option value="6">Six Months - $60</option>
                <option value="12">Twelve Months- $120</option>
              </Field>
            </div>
          </div>
        </form>
        </div>
        {/*<h1 style={{display:'block', fontSize:'25px', marginTop:'100px'}}> Payment</h1>*/}
        <CardPayment movieId= {1} months={this.state.months} price={this.state.months*10} subscription={"SUBSCRIPTION_ONLY"}/>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    movies: state.moviesList.data
  }
}

function validate(values) {
  const errors = {};
  if (!values.subscriptionPlan) {
    errors.subscriptionPlan = "Please Select a subscription plan \n";
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'Filtermovies'})(connect(mapStateToProps,{payAmount})(UserSubscription));
