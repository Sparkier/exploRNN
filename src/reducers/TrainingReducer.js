import initialState from './initialState';
import * as types from '../actions/types';

export default function trainingReducer(state = initialState.training, action) {
  switch (action.type) {
    case types.TOGGLE_TRAINING:
      return !state;
    case types.STOP_TRAINING:
      return false;
    default:
      return state;
  }
}
