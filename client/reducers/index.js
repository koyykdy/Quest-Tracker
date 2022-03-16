/**
 * ************************************
 *
 * @module  index.js
 * @author
 * @date
 * @description simply a place to combine reducers
 *
 * ************************************
 */

 import { combineReducers } from 'redux';
 import questsReducer from './questsReducer';
 
 export default combineReducers({
   quests: questsReducer,
 });
 