import * as types from './types';

/**
 * Switches training from on to off, or off to on
 * 
 * @param {object} training the new training object
 */
export function toggleTraining(training) {
  return {type: types.TOGGLE_TRAINING, training};
}

/**
 * Stops the training of the current model
 * 
 * @param {object} training the new training object
 */
export function stopTraining(training) {
  return {type: types.STOP_TRAINING, training};
}

/**
 * Updates the internal UI values
 * 
 * @param {object} ui the object holding the new ui values
 */
export function updateUI(ui) {
  return {type: types.UPDATE_UI, ui};
}

/**
 * Updates the network values of the RNN model
 * 
 * @param {object} network the object holding the new network values
 */
export function updateNetwork(network) {
  return {type: types.UPDATE_NETWORK, network};
}

/**
 * Updates the internal training values
 * 
 * @param {object} training the object holding the new training values 
 */
export function updateTraining(training) {
  return {type: types.UPDATE_TRAINING, training};
}

/**
 * Updates the alertsnack values
 * 
 * @param {object} alertSnack the new alertSnack object
 */
export function updateAlertSnack(alertSnack) {
  return {type: types.UPDATE_ALERT_SNACK_SUCCESS, alertSnack};
}

/**
 * Adds a new Dataset for the current timestep, includes training data, 
 * prediction data and ui data
 * 
 * @param {object} net the old network object
 * @param {array} chIn input data for the drawing canvas
 * @param {array} chOut output data for the drawing canvas
 * @param {array} chP prediction input data for the drawing canvas
 * @param {tf.Tensor} modIn input data for the training of the model
 * @param {tf.Tensor} modOut output data for the training of the model
 * @param {tf.Tensor} modP prediction input for the testing of the model
 */
export function addDataToNetwork(net, chIn, chOut, chP, modIn, modOut, modP) {
  const data = net.data;
  data.shift();
  data.push({
    chartInput: chIn,
    chartOutput: chOut,
    chartPrediction: chP,
    modelInput: modIn,
    modelOutput: modOut,
    modelPrediction: modP,
    prediction: [],
  });
  const network = {...net, data: data};
  return {type: types.UPDATE_NETWORK, network};
}

/**
 * adds the predicted data from the network for the current input values
 * 
 * @param {object} oldNetwork the old network object
 * @param {array} prediction the new prediction data
 */
export function addPredictionToNetwork(oldNetwork, prediction) {
  const data = oldNetwork.data;
  data[2].prediction = prediction;
  const network = {...oldNetwork, data: data};
  return {type: types.UPDATE_NETWORK, network};
}
