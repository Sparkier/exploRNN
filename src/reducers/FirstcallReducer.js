import initialState from './initialState';
import * as types from '../actions/types';

export default function firstcallReducer(state = initialState.firstcall, action) {
  console.log(action.type);
  switch (action.type) {
    case types.RESET_MODEL:
      return true;
    case types.FIRST_CALL:
      return false;
    default:
      return state;
  }
}
