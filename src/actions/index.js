import * as types from './types';

/**
 * Switches training from on to off, or off to on
 *
 * @param {object} training the new training object
 * @return {object} a redux state update
 */
export function toggleTraining(training) {
  return {type: types.TOGGLE_TRAINING, training};
}

/**
 * Stops the training of the current model
 *
 * @param {object} training the new training object
 * @return {object} a redux state update
 */
export function stopTraining(training) {
  return {type: types.STOP_TRAINING, training};
}

/**
 * Updates the internal UI values
 *
 * @param {object} ui the object holding the new ui values
 * @return {object} a redux state update
 */
export function updateUI(ui) {
  return {type: types.UPDATE_UI, ui};
}

/**
 * Updates the internal appState values
 *
 * @param {object} appState the object holding the new appState values
 * @return {object} a redux state update
 */
export function updateAppState(appState) {
  return {type: types.UPDATE_APP_STATE, appState};
}

/**
 * Updates the network values of the RNN model
 *
 * @param {object} network the object holding the new network values
 * @return {object} a redux state update
 */
export function updateNetwork(network) {
  return {type: types.UPDATE_NETWORK, network};
}

/**
 * Updates the internal training values
 *
 * @param {object} training the object holding the new training values
 * @return {object} a redux state update
 */
export function updateTraining(training) {
  return {type: types.UPDATE_TRAINING, training};
}

/**
 *  Updates the state of the AlertSnack
 *
 * @param {object} alertSnack the changed alertSnack object
 * @return {object} a redux state update
 */
export function updateAlertSnack(alertSnack) {
  return {type: types.UPDATE_ALERT_SNACK, alertSnack};
}

/**
 * Updates the TextData state
 * @param {object} textData the new text data object for the app
 * @return {object} a redux state update
 */
export function updateTextData(textData) {
  return {type: types.UPDATE_TEXT_DATA, textData};
}

/**
 * Updates the cookiesState values
 *
 * @param {object} cookiesState the object holding the new cookiesState values
 * @return {object} a redux state update
 */
export function updateCookiesState(cookiesState) {
  return {type: types.UPDATE_COOKIES_STATE, cookiesState};
}

/**
 * Updates the internal pretrained values
 *
 * @param {object} pretrained the object holding the new pretrained values
 * @return {object} a redux state update
 */
export function updatePretrained(pretrained) {
  return {type: types.UPDATE_PRETRAINED, pretrained};
}
