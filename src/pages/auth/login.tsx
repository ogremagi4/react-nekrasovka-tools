import React, { Component } from 'react';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Checkbox } from '@paljs/ui/Checkbox';
import { Link } from 'gatsby';
import Auth, { Group } from '../../components/Auth';
import SEO from '../../components/SEO';
import { navigate } from 'gatsby';
import { nekrasovkaApi } from '../../components/NekrasovkaApiCaller';
// import logo from '../../../src/logo.png'
// import '../../../src/App.css'

export const isBrowser = () => typeof window !== 'undefined';
export const getToken = () => isBrowser() && window.localStorage.getItem('token');
export const isLoggedIn = () => !!getToken();

class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.state = {
      username: null,
      password: null,
    };
  }

  render() {
    if (isLoggedIn()) {
      navigate(`/dashboard`);
    }
    return (
      <>
      {/* <img src={logo} className="rotate_03" alt="logo" /> */}
      <Auth title="Login" subTitle="Hello! Login with your email">
        <SEO title="Login" keywords={['OAH', 'application', 'react']} />
        <form>
          <InputGroup fullWidth>
            <input type="email" name="username" placeholder="Email Address" onChange={this.handleChange} />
          </InputGroup>
          <InputGroup fullWidth>
            <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
          </InputGroup>
          <Group>
            <Checkbox onChange={this.onCheckbox}>Remember me</Checkbox>
            <Link to="/auth/request-password">Forgot Password?</Link>
          </Group>
          <Button status="Success" type="button" shape="SemiRound" fullWidth onClick={this.handleLoginClick}>
            Login
          </Button>
        </form>
        <p>
          Don&apos;t have account? <Link to="/auth/register">Register</Link>
        </p>
      </Auth>
      </>
    );
  }

  handleLoginClick(e) {
    e.preventDefault();

    nekrasovkaApi
      .login(this.state.username, this.state.password)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        navigate('/eds');
      })
      .catch((x) => {
        console.log(x);
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
}

export default Login;
