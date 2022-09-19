import { combineReducers } from '@reduxjs/toolkit';
import modal from './modal';
import user from './user';

const reducer = combineReducers({
  modal,
  user,
});

export default reducer;
