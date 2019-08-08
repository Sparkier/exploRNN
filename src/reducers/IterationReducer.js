import initialState from './initialState';
import * as types from '../actions/types';

export default function iterationReducer(state = initialState.iteration, action) {
  switch (action.type) {
    case types.UPDATE_ITERATION:
      return action.iteration;
    default:
      return state;
  }
}
