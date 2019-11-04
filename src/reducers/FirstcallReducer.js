import initialState from './initialState';
import * as types from '../actions/types';

/**
 * This function is called every time the global state has changed
 * and checks the action message to see if the firstCall parameter in the
 * state needs to be updated
 *
 * @param {object} state the current global state of this application
 * @param {object} action the action message sent by the redux state change
 * @return {object} the new value for the firstCall parameter
 */
export default function firstcallReducer(
    state = initialState.firstcall, action) {
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
