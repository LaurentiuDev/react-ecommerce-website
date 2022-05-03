import { Component } from "react";
import { Button, Form, Input } from "reactstrap";
import { UserService } from "../../../services/userService";
import './Login.scss';
import { useNavigate } from "react-router-dom";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fieldValidationErrorMessage: ''
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  onLogin() {
    const { email, password } = this.state;
    const userDto = {
      email,
      password
    };

    const userService = new UserService();
    const users = userService.getAll();
    users.then((data) => {
      console.log(data);
      const user = data.find(user => user.email === email && user.password === password);
      if (user) {
        this.setState({
          fieldValidationErrorMessage: ''
        });
      } else {
        this.setState({
          fieldValidationErrorMessage: 'Given email and password are incorrect.'
        });
      }

    });

    if(!this.state.fieldValidationErrorMessage) {
      //this.props.history.push('/home');
    }
  }

  render() {
    const { email, password, fieldValidationErrorMessage } = this.state;
    return (
      <div className='login-content'>
        <div className='login-container'>
          <div className='login-title-container'>
            <h2>Login</h2>
          </div>
          <div className='login-form-container'>
            <Form>
              <div className='email-item-container input-item-container'>
                <Input
                  type="email"
                  name={'email'}
                  value={email}
                  placeholder="Enter your email"
                  onChange={this.handleChange}
                />
              </div>
              <div className='password-item-container input-item-container'>
                <Input
                  type="password"
                  name={'password'}
                  value={password}
                  placeholder="Enter your password"
                  onChange={this.handleChange}
                />
              </div>
              <div className='login-button-container'>
                <Button className='login-button' color="primary" onClick={this.onLogin.bind(this)}>Login</Button>
              </div>
              <div className="field-validation-error-message">{fieldValidationErrorMessage}</div>
            </Form>
          </div>
        </div>
      </div>
    ); 
  }
}