import React, {Component} from 'react';
import {FormErrors} from './FormErrors';
import axios from 'axios';
import './Form.css';


class Form extends Component {

	constructor (props) {
		super(props);
		this.state = {
			email: '',
      name: '',
      phone: '',
      dob: '',
			formErrors: {email: '', name: '', phone: '', dob: ''},
			emailValid: false,
      nameValid: false,
      phoneValid: false,
      dobValid: false,
			formValid: false,
      
		}
    this.onSubmit = this.onSubmit.bind(this);
	}

	handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  	}

    onSubmit = (e) => {
      e.preventDefault();
      
      var form_data = {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        dob: this.state.dob
      };
        
        alert(JSON.stringify(form_data));
        this.setState({ name: '', email: '', phone: '', dob: '' });
            
        
    }

  	validateField(fieldName, value) {
  		let fieldValidationErrors = this.state.formErrors;
  		let emailValid = this.state.emailValid;
      let nameValid = this.state.nameValid;
      let phoneValid = this.state.phoneValid;
      let dobValid = this.state.dobValid;

  		switch(fieldName) {
  			case 'email':
  			emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  			fieldValidationErrors.email = emailValid ? '' : ' is invalid';
  			break;

        case 'phone':
        phoneValid = value.match(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/);
        fieldValidationErrors.phone = phoneValid ? '' : ' number is invalid';
        break;
          
        case 'dob':
        var optimizedBirthday = value.replace(/-/g, "/");
        var myBirthday = new Date(optimizedBirthday);
        var currentDate = new Date().toJSON().slice(0,10)+' 01:00:00';
        var myAge = ~~((Date.now(currentDate) - myBirthday) / (31557600000));
        console.log(myAge);
        dobValid = myAge > 18;
        fieldValidationErrors.dob = dobValid ? '' : ': you must need to be 18';
        break;

  			case 'name':
  			nameValid = value.length >= 4;
  			fieldValidationErrors.name = nameValid ? '' : ' is too short';
  			break;
  			default:
  			break;
  		}
  		this.setState({formErrors: fieldValidationErrors,
  			emailValid: emailValid,
        nameValid: nameValid,
        phoneValid: phoneValid,
        dobValid: dobValid
  		}, this.validateForm);
  	}

  	validateForm() {
  		this.setState({formValid: this.state.emailValid && this.state.nameValid && this.state.phoneValid && this.state.dobValid});
  	}

  	errorClass(error) {
  		return(error.length === 0 ? '' : 'has error');
  	}

    

	render () {
		return (

    <section id="login">
    <div className="container">
      <div className="row">
          <div className="col-xs-12">
              <div className="form-wrap">
			<form onSubmit={this.onSubmit} id="login-form" autoComplete="off">
			<div className="panel-default">
			<FormErrors formErrors = {this.state.formErrors} />
			</div>
      <div className={'form-group ${this.errorClass(this.state.formErrors.name)}'}>
      <label htmlFor="name"> Name </label>
      <input type="text" required className="form-control" name="name" placeholder="Name" value={this.state.name} onChange={this.handleUserInput} />
      </div>
			<div className={'form-group ${this.errorClass(this.state.formErrors.email)}'}>
			<label htmlFor="email"> Email Address </label>
			<input type="email" autoComplete="off" required className="form-control" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleUserInput} />
			</div>

       <div className={'form-group ${this.errorClass(this.state.formErrors.dob)}'}>
      <label htmlFor="dob"> Date of Birth </label>
      <input type="date" required data-provide="datepicker" className="form-control" name="dob" id="date" placeholder="Date of Birth" value={this.state.dob} onChange={this.handleUserInput} />
      </div>

      <div className={'form-group ${this.errorClass(this.state.formErrors.phone)}'}>
      <label htmlFor="phone"> Phone Number </label>
      <input type="phone" required className="form-control" name="phone" placeholder="Phone Number" value={this.state.phone} onChange={this.handleUserInput} />
      </div>
			<button type="submit" className="btn btn-primary" disabled={!this.state.formValid}> Submit </button>
			<hr/>
      </form>
          </div>
        </div> 
      </div>
    </div> 
</section>

			)
	}
}
export default Form;
