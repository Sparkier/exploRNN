import initialState from './initialState';
import * as types from '../actions/types';

/**
 * This function is called every time the global state has changed
 * and checks the action message to see if the Training object in the
 * state needs to be updated
 *
 * @param {object} state the current global state of this application
 * @param {object} action the action message sent by the redux state change
 * @return {object} the new value for the training object
 */
export default function trainingReducer(
    state = initialState.training, action) {
  switch (action.type) {
    case types.TOGGLE_TRAINING:
      return {
        ...(action.training),
        running: !(action.training.running),
      };
    case types.STOP_TRAINING:
      return {
        ...action.training,
        running: false,
      };
    case types.UPDATE_TRAINING:
      return action.training;
    case types.REINIT:
      return {...initialState.training, reset: true};
    default:
      return state;
  }
}
