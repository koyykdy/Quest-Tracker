/**
 * ************************************
 *
 * @module  index.js (previously login.js)
 * @author  David Kim
 * @date    3/16/2022
 * @description presentation component that renders a single box with log-in forms
 *
 * ************************************
 */
import React, { Component } from 'react';

class LoginBox extends Component{
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
    // this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event){
    event.preventDefault();
    // make a post request to server backend /login with username and password in the request body
    const port = process.env.NODE_ENV === 'development' ? 3000 : 8080;
    const url = `http://localhost:${port}/login`;
    const loginObject = {
      username: event.target.username.value,
      password: event.target.password.value
    };
    let fetchStatus;
    fetch(url, { // <- returns a response asynchronously
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors',
      credentials: "include", // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      // redirect: 'follow', // manual, *follow, error
      body: JSON.stringify(loginObject) // body data type must match "Content-Type" header
    })
    .then((response) => {
      // console.log(response);
      fetchStatus = response.status;
      return response.json();
    })
    .then((data) => {
      if (fetchStatus === 200) {
        if (data.cookieExists) alert('Already logged in'); 
        else alert('Login successful');
      }
      else alert('Login error');
      // handle response
      // console.log(data);
    });
  }

  render(){
    return (
      <div id="LoginBox">
        <form id="loginForm" onSubmit={this.onSubmit}>
          <span>Username: </span> <input name="username" id="usernameInput" type="text"></input>
          <span>Password: </span> <input name="password" id="passwordInput" type="password"></input>
          <button className='loginButton' type="submit">Log in</button>
        </form>
      </div>
    )
  };
};

// const LoginBox = (submitLogin) => (
//   <div id="LoginBox">
//     <form id="loginForm" onSubmit={submitLogin}>
//       <span>Username: </span> <input name="username" id="usernameInput" type="text"></input>
//       <span>Password: </span> <input name="password" id="passwordInput" type="password"></input>
//       <button className='loginButton' value='Log in' type="submit"></input>
//     </form>
//   </div>
// );
 
 export default LoginBox;
 