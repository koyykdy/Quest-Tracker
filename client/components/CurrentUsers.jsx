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
import UserBox from './UserBox.jsx';

class CurrentUsers extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    // fetch users

    // check state to create component array
    const usersComponents = [];
    let i = 0;
    this.props.usersData.forEach( el => {
      usersComponents.push(<p key={'userLabel' + String(i)}>User {i}: </p>);
      usersComponents.push(<UserBox userData={el} key={'user' + String(i++)}/>);
    });

    return (
      <div id="CurrentUsers">
        <p>List of Currently Registered Users: </p>
        {usersComponents}
      </div>
    )
  };
};

export default CurrentUsers;
 