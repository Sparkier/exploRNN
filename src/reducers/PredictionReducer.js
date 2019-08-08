import initialState from './initialState';
import * as types from '../actions/types';

export default function predictionReducer(state = initialState.prediction, action) {
  console.log(action.type);
  switch (action.type) {
    case types.UPDATE_PREDICTION:
      return action.prediction;
    default:
      return state;
  }
}
