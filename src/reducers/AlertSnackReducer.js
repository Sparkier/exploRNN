import initialState from './initialState';
import * as types from '../actions/types';

export default function alertSnackReducer(state = initialState.alertSnack, action) {
  switch (action.type) {
    case types.UPDATE_ALERT_SNACK_SUCCESS:
      return action.alertSnack;
    default:
      return state;
  }
}
