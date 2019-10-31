import initialState from './initialState';
import * as types from '../actions/types';

export default function uiReducer(state = initialState.ui, action) {
  console.log(action.type);
  switch (action.type) {
    case types.UPDATE_UI:
      return action.ui;
    default:
      return state;
  }
}
