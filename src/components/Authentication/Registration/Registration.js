import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'reactstrap';
import { ValidationConstants } from '../../../constants/validationConstants';
import { UserService } from '../../../services/userService';
import './Registration.scss';

export class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      fieldValidationErrorMessage: ''
    };
  }

  isFormValid(user) {
    if(user.firstName === '' || (user.firstName && user.firstName.length <= 2)) {
      this.setState({
        fieldValidationErrorMessage: 'The first name requires more than 2 characters.'
      });
      return false;
    }
    if(user.lastName === '' || (user.lastName && user.lastName.length <= 2)) {
      this.setState({
        fieldValidationErrorMessage: 'The last name field requires more than 2 characters.'
      });
      return false;
    }
    if(!ValidationConstants.emailPattern.test(`${user.email}`)) {
      this.setState({
        fieldValidationErrorMessage: 'Email is not valid.'
      });
      return false;
    }
    if(!ValidationConstants.passwordPattern.test(`${user.password}`)) {
      this.setState({
        fieldValidationErrorMessage: 'Password is not valid.'
      });
      return false;
    }
    if(!(user.confirmPassword === user.password)) {
      this.setState({
        fieldValidationErrorMessage: 'Passwords do not match.'
      });
      return false;
    }
    this.setState({
      fieldValidationErrorMessage: ''
    });
    return true;
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  componentDidUpdate() {
    //console.log(this.state);
  }

  save = async () => {
    const { firstName, lastName, email, password, confirmPassword } = this.state;
    
    const userDto = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    };

    if(!this.isFormValid(userDto)) {
      return;
    }

    const user = {
      firstName,
      lastName,
      email,
      password
    };
    
    const userService = new UserService();
    userService.register(user);
  }

  render() {
    const { firstName, lastName, email, password, confirmPassword, fieldValidationErrorMessage } = this.state;
    return (
      <div className='registration-content'>
        <div className='registration-container'>
          <div className='registration-title-container'>
            <h2>Register</h2>
          </div>
          <div className='registration-form-container'>
            <Form>
              <div className='first-name-item-container input-item-container'>
                <Input
                  type='text'
                  name={'firstName'}
                  value={firstName}
                  placeholder="Enter your first name"
                  onChange={this.handleChange}
                />
              </div>
              <div className='last-name-item-container input-item-container'>
                <Input
                  type='text'
                  name={'lastName'}
                  value={lastName}
                  placeholder="Enter your last name"
                  onChange={this.handleChange}
                />
              </div>
              <div className='email-item-container input-item-container'>
                <Input
                  type='email'
                  name={'email'}
                  value={email}
                  placeholder="Enter your email"
                  onChange={this.handleChange}
                />
              </div>
              <div className='password-item-container input-item-container'>
                <Input
                  type='password'
                  name={'password'}
                  value={password}
                  placeholder="Enter your password"
                  onChange={this.handleChange}
                />
              </div>
              <div className='confirm-password-item-container input-item-container'>
                <Input
                  type='password'
                  name={'confirmPassword'}
                  value={confirmPassword}
                  placeholder="Confirm your password"
                  onChange={this.handleChange}
                />
              </div>
              <div className='register-button-container'>
                <Button className='register-button' color="primary" onClick={this.save}>Register</Button>
              </div>
              <div>{fieldValidationErrorMessage}</div>
            </Form>
          </div>
          <p>Have already an account? <Link to={'/login'}>Login here</Link></p>
        </div>
      </div>
    )
  }
}