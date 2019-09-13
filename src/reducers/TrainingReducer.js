import initialState from './initialState';
import * as types from '../actions/types';

export default function trainingReducer(state = initialState.training, action) {
  switch (action.type) {
    case types.TOGGLE_TRAINING:
      return {
        ...(action.training),
        running: !(action.training.running)
      };
    case types.STOP_TRAINING:
      return {
        ...action.training,
        running: false
      };
    case types.UPDATE_TRAINING:
      return action.training;
    default:
      return state;
  }
}
