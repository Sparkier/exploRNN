import * as types from './types';

export function updateAlertSnack(alertSnack) {
  return {type: types.UPDATE_ALERT_SNACK_SUCCESS, alertSnack}
}

export function updatePrediction(prediction) {
  return {type: types.UPDATE_PREDICTION, prediction}
}

export function updateIteration(iteration) {
  return {type: types.UPDATE_ITERATION, iteration}
}

export function toggleTraining() {
  return {type: types.TOGGLE_TRAINING}
}

export function resetNetwork() {
  return function(dispatch) {
    dispatch(updateIteration(0));
    dispatch(updatePrediction(0));
    dispatch(stopTraining());
  }
}

export function stopTraining() {
  return {type: types.STOP_TRAINING} 
}
