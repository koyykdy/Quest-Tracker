/**
 * ************************************
 *
 * @module  signup.js
 * @author  David Kim
 * @date    3/17/2022
 * @description presentation component that renders a single box with the signup form
 *
 * ************************************
 */
import React, { Component } from 'react';
// import css here

class SignupBox extends Component{
  render(){
    <div id="SignupBox">
        <form id="loginForm" onSubmit={this.onSubmit}>
          <input name="username" id="usernameInput" type="text"     placeholder="username"></input>
          <br/>
          <br/>
          <input name="password" id="passwordInput" type="password" placeholder="password"></input>
          <br/>
          <br/>
          <button class='signUpButton' type="submit">Sign Up</button>
        </form>
      </div>
    // return (
    //   <div id="SignupBox">
    //     <form id="signupForm" onSubmit={this.props.formSubmit}>
    //       <span>Username: </span> <input name="username" id="usernameInput" type="text"></input>
    //       <span>Password: </span> <input name="password" id="passwordInput" type="password"></input>
    //       <span>Nickname: </span> <input name="nickname" id="nicknameInput" type="text"></input>
    //       <span>E-mail address: </span> <input name="email" id="emailInput" type="email"></input>
    //       <input type="checkbox" id="tos" name="tos" defaultChecked={ this.props.checked } />
    //       <label htmlFor="tos">I agree to the <a href='https://en.wikipedia.org/wiki/Terms_of_service' target="_blank">terms of service</a></label>
    //       <button className='loginButton' type="submit">Sign up</button>
    //     </form>
    //   </div>
    // )
  };
};

export default SignupBox;
