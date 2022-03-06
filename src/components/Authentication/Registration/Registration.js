import React, { Component } from 'react';
import { Form, Input, Button } from 'reactstrap';
import './Registration.scss';

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.value,
      lastName: this.props.value,
      email: this.props.value,
      password: this.props.value
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    this.setState({
      [name]: value
    })
  }

  componentDidUpdate() {
    //console.log(this.state);
  }

  render() {
    const { firstName, lastName, email, password } = this.state;
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
                  name={'first-name'}
                  value={firstName}
                  placeholder="Enter your first name"
                  onChange={this.handleChange}
                />
              </div>
              <div className='last-name-item-container input-item-container'>
                <Input
                  type='text'
                  name={'last-name'}
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
              <div className='register-button-container'>
                <Button color="primary">Register</Button>
              </div>

            </Form>
          </div>
        </div>
      </div>
    )
  }
}