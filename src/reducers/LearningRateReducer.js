import initialState from './initialState';
import * as types from '../actions/types';

export default function learningRateReducer(state = initialState.learningRate, action) {
  console.log(action.type);
  switch (action.type) {
    case types.UPDATE_LEARNING_RATE:
      return action.learningRate;
    default:
      return state;
  }
}
