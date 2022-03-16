/**
 * ************************************
 *
 * @module  Login
 * @author
 * @date
 * @description presentation component that renders a single box with log-in forms
 *
 * ************************************
 */
import React, { Component } from 'react';

class UserInput extends Component{
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  onSubmit(event){
    alert('Form submitted:' + this.state.value);
  }

  render(){
    return (
      <div>
        <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
          <TextField
            onChange={this.handleChange}
            id="outlined-name"
            label="Image Search"
            margin="normal"
            variant="outlined"
            style={{minWidth:'500px'}}
            type="text"
            /><br></br>
            <Button 
            variant="contained" 
            color="primary"
            type="submit"
            >
            Search
            </Button>
        </form>
      </div>
    )
  };
};

const LoginBox = (submitLogin) => (
  <div id="LoginBox">
    <form id="loginForm">
      <span>Username: </span> <input id='usernameInput' type='text'></input>
      <span>Password: </span> <input id='passwordInput' type='password'></input>
      <input className='loginButton' type='button' value='Log in' onClick={submitLogin}></input>
    </form>
  </div>
);
 
 export default LoginBox;
 