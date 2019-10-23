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

export function updateLearningRate(learningRate) {
  return {type: types.UPDATE_LEARNING_RATE, learningRate}
}

export function toggleTraining(training) {
  return {type: types.TOGGLE_TRAINING, training}
}

export function updateUI(ui) {
  return {type: types.UPDATE_UI, ui}
}

export function resetNetwork(training) {
  resetModel()
}

export function stopTraining(training) {
  return {type: types.STOP_TRAINING, training} 
}

export function resetModel() {
  return {type: types.RESET_MODEL} 
}

export function firstcall() {
  return {type: types.FIRST_CALL}
}

export function updateNetwork(network) {
  return {type: types.UPDATE_NETWORK, network}
}

export function updateTraining(training) {
  return {type: types.UPDATE_TRAINING, training}
}

export function addDataToNetwork(oldNetwork, chartInput, chartOutput, chartPrediction, modelInput, modelOutput, modelPrediction) {
  const data = oldNetwork.data;
  data.shift();
  data.push({
    chartInput: chartInput,
    chartOutput: chartOutput,
    chartPrediction: chartPrediction,
    modelInput: modelInput,
    modelOutput: modelOutput,
    modelPrediction: modelPrediction,
    prediction: [],
  })
  const network = {...oldNetwork, data: data}
  return {type: types.UPDATE_NETWORK, network}
}

export function addPredictionToNetwork(oldNetwork, prediction) {
  const data = oldNetwork.data;
  data[2].prediction = prediction;
  const network = {...oldNetwork, data: data}
  return {type: types.UPDATE_NETWORK, network}

}