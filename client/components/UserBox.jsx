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

class UserBox extends Component{

  render(){
    // console.log(this.props);
    // check state to create component array

    return (
      <div className="UserBox">
        <p><span>Username: </span>{this.props.userData.username}</p>
        <p><span>Password: </span>{this.props.userData.password}</p>
        <p><span>Nickname: </span>{this.props.userData.nickname}</p>
        <p><span>E-Mail: </span>{this.props.userData.email}</p>
        <p><span>Agreed to Terms of Service: </span>{this.props.userData.tos}</p>
      </div>
    )
  };
};

export default UserBox;
