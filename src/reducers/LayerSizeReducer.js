import initialState from './initialState';
import * as types from '../actions/types';

export default function layerSizeReducer(state = initialState.layerSize, action) {
  switch (action.type) {
    case types.UPDATE_LAYER_SIZE:
      return action.layerSize;
    default:
      return state;
  }
}
