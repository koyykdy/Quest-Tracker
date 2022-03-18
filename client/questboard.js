/**
 * ************************************
 *
 * @module  questboard.js
 * @author  David Kim
 * @date    3/15/2022
 * @description entry point for application. Hangs React-Redux app off of #root in questboard.html
 *
 * ************************************
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './store';
// import styles from './scss/application.scss';

render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);
