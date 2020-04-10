import initialState from './initialState';
import * as types from '../actions/types';

/**
 * This function is called every time the global state has changed
 * and checks the action message to see if the cookiesState object in the
 * state needs to be updated
 *
 * @param {object} state the current global state of this application
 * @param {object} action the action message sent by the redux state change
 * @return {object} the new value for the cookiesState object
 */
export default function cookiesStateReducer(state = initialState.cookiesState,
    action) {
  switch (action.type) {
    case types.UPDATE_COOKIES_STATE:
      return action.cookiesState;
    default:
      return state;
  }
}
