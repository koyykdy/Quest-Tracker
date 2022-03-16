/**
 * ************************************
 *
 * @module  store.js
 * @author
 * @date
 * @description Redux 'single source of truth' for quest board
 *
 * ************************************
 */

 import { createStore, applyMiddleware } from 'redux';
 import { composeWithDevTools } from 'redux-devtools-extension';
 import thunk from 'redux-thunk';
 import reducers from './reducers/index';
 import { loadQuests } from './actions/actions';
 
 const store = createStore(
   reducers,
   composeWithDevTools(applyMiddleware(thunk)),
 );
 
 store.dispatch(loadQuests());
 
 export default store;
 