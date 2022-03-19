import { Component } from "react";
import { Button, Form, Input } from "reactstrap";
import './Login.scss';

interface IProps {
}

interface ILoginState {
  email?: string;
  password?: string;
}

export class Login extends Component<IProps, ILoginState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  public handleChange = (e: any) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  public save(): void {

  }

  render() {
    const { email, password } = this.state;
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
                <Button className='login-button' color="primary" onClick={this.save}>Login</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    ); 
  }
}