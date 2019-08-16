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

export function updateLayerSize(layerSize) {
  return {type: types.UPDATE_LAYER_SIZE, layerSize}
}

export function toggleTraining() {
  return {type: types.TOGGLE_TRAINING}
}

export function resetNetwork() {
  return function(dispatch) {
    dispatch(updateIteration(0));
    dispatch(updatePrediction(0));
    dispatch(stopTraining());
    dispatch(resetModel());
  }
}

export function stopTraining() {
  return {type: types.STOP_TRAINING} 
}

export function resetModel() {
  return {type: types.RESET_MODEL} 
}

export function firstcall() {
  return {type: types.FIRST_CALL}
}
