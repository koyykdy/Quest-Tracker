/**
 * ************************************
 *
 * @module  login.js
 * @author  David Kim
 * @date    3/15/2022
 * @description entry point for application. Hangs React components off of #root in login.html
 *
 * ************************************
 */

 import React from 'react';
 import { render } from 'react-dom';
 import LoginBox from './components/LoginBox.jsx';
 // import styles from './scss/application.scss';
 
 // render a login page with reactive components
 render(
   <div>
     <LoginBox />
   </div>
   ,
   document.getElementById('root')
 );