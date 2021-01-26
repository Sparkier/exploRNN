import initialState from './initialState';
import * as types from '../actions/types';

/**
 * This function is called every time the global state has changed
 * and checks the action message to see if the appState object in the
 * state needs to be updated
 *
 * @param {object} state the current global state of this application
 * @param {object} action the action message sent by the redux state change
 * @return {object} the new value for the appState object
 */
export default function counterReducer(state = initialState.counter, action) {
  switch (action.type) {
    case types.UPDATE_COUNTDOWN:
      return {...state, countDown: action.countValue};
    default:
      return state;
  }
}
