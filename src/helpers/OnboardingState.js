import globalConstants from '../components/constants/global';
import * as Cookies from '../helpers/Cookies';

/**
 * Returns the props for the current onboarding element.
 *
 * @param {object} uiState the state of the ui of the application
 * @param {object} cookiesState state of the cookies saved by the application
 * @param {object} appState the state of the application
 * @param {object} trainingState the state of the training process
 * @param {object} networkState the state of the network
 * @return {object} the props for the current onboarding element
 */
export function getCurrentOnboardingElementProps(uiState, cookiesState,
    appState, trainingState, networkState) {
  let open = false;
  const constants = globalConstants[appState.language].strings;
  let state = constants.onboarding.welcome;
  if (cookiesState.intro === '') {
    open = uiState.detail ? false : true;
  } else if (cookiesState.intro === 'input') {
    open = uiState.detail ? false : true;
    state = constants.onboarding.input;
  } else if (cookiesState.intro === 'network') {
    open = uiState.detail ? false : true;
    state = constants.onboarding.network;
  } else if (cookiesState.intro === 'startTraining') {
    open = uiState.detail ? false : true;
    state = constants.onboarding.startTraining;
  } else if (cookiesState.intro === 'output') {
    open = uiState.detail ? false : true && (networkState.iteration > 1);
    state = constants.onboarding.output;
  } else if (cookiesState.intro === 'cellTransition') {
    open = uiState.detail ? false : true && (networkState.iteration > 9);
    state = constants.onboarding.cellTransition;
  } else if (cookiesState.intro === 'detailOutput') {
    open = uiState.detail ? true : false;
    state = constants.onboarding.detailOutput;
  } else if (cookiesState.intro === 'detailCell') {
    open = uiState.detail ? true : false;
    state = constants.onboarding.detailCell;
  } else if (cookiesState.intro === 'headingExplanation') {
    open = uiState.detail ? true : false;
    state = constants.onboarding.headingExplanation;
  }
  return {
    open: open,
    state: state,
  };
}

/**
 * Returns the next intro state.
 *
 * @param {String} introState the current state of the onboarding
 * @param {object} cookiesState the current cookiestate
 * @param {function} action the action for updating the cookiestate
 */
export function getNextIntroState(introState, cookiesState, action) {
  let newIntroState = introState;
  if (introState === '' || introState === undefined) {
    newIntroState = 'input';
  } else if (introState === 'input') {
    newIntroState = 'network';
  } else if (introState === 'network') {
    newIntroState = 'startTraining';
  } else if (introState === 'startTraining') {
    newIntroState = 'output';
  } else if (introState === 'output') {
    newIntroState = 'cellTransition';
  } else if (introState === 'cellTransition') {
    newIntroState = 'detailCell';
  } else if (introState === 'detailCell') {
    newIntroState = 'detailOutput';
  } else if (introState === 'detailOutput') {
    newIntroState = 'headingExplanation';
  } else {
    newIntroState = 'done';
  }
  Cookies.setIntroState(newIntroState);
  action({...cookiesState, intro: newIntroState});
}
