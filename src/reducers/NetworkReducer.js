import initialState from './initialState';
import * as types from '../actions/types';

export default function networkReducer(state = initialState.network, action) {
  console.log(action.type);
  switch (action.type) {
    case types.UPDATE_NETWORK:
      return action.network;
    default:
      return state;
  }
}
