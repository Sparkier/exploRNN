import globalConstants from '../components/constants/global';
import * as Cookies from '../helpers/Cookies';

let timer = false;

/**
 * Returns the props for the current onboarding element.
 *
 * @param {object} uiState the state of the ui of the application
 * @param {object} cookiesState state of the cookies saved by the application
 * @param {object} appState the state of the application
 * @param {object} networkState the state of the network
 * @return {object} the props for the current onboarding element
 */
export function getCurrentOnboardingElementProps(uiState, cookiesState,
    appState, networkState) {
  let open = false;
  const constants = globalConstants[appState.language].strings;
  let state = constants.onboarding.welcome;
  if (cookiesState.intro === '') {
    open = uiState.detail ? false : true;
  } else if (cookiesState.intro === 'contrast') {
    open = (uiState.detail ? false : true) && (networkState.iteration > 9);
    state = constants.onboarding.contrast;
  } else if (cookiesState.intro === 'input') {
    open = uiState.detail ? false : true;
    state = constants.onboarding.input;
  } else if (cookiesState.intro === 'network') {
    open = uiState.detail ? false : true;
    state = constants.onboarding.network;
  } else if (cookiesState.intro === 'sliders') {
    open = true;
    state = constants.onboarding.sliders;
  } else if (cookiesState.intro === 'slidersExplained') {
    open = true;
    state = constants.onboarding.slidersExplained;
  } else if (cookiesState.intro === 'lowLR') {
    open = true;
    state = constants.onboarding.lowLR;
  } else if (cookiesState.intro === 'highLR') {
    open = true;
    state = constants.onboarding.highLR;
  } else if (cookiesState.intro === 'medLR') {
    open = true;
    state = constants.onboarding.medLR;
  } else if (cookiesState.intro === 'lowBS') {
    open = true;
    state = constants.onboarding.lowBS;
  } else if (cookiesState.intro === 'highBS') {
    open = true;
    state = constants.onboarding.highBS;
  } else if (cookiesState.intro === 'medBS') {
    open = true;
    state = constants.onboarding.medBS;
  } else if (cookiesState.intro === 'noNoise') {
    open = true;
    state = constants.onboarding.noNoise;
  } else if (cookiesState.intro === 'medNoise') {
    open = true;
    state = constants.onboarding.medNoise;
  } else if (cookiesState.intro === 'highNoise') {
    open = true;
    state = constants.onboarding.highNoise;
  } else if (cookiesState.intro === 'startTraining') {
    open = uiState.detail ? false : true;
    state = constants.onboarding.startTraining;
  } else if (cookiesState.intro === 'output') {
    open = uiState.detail ? false : true;
    state = constants.onboarding.output;
  } else if (cookiesState.intro === 'cellTransition') {
    open = (uiState.detail ? false : true) && (networkState.iteration > 14);
    state = constants.onboarding.cellTransition;
  } else if (cookiesState.intro === 'detailOutput') {
    open = (uiState.detail ? true : false) && timer;
    state = constants.onboarding.detailOutput;
  } else if (cookiesState.intro === 'detailCell') {
    open = (uiState.detail ? true : false) && timer;
    state = constants.onboarding.detailCell;
  } else if (cookiesState.intro === 'detailCellMemory') {
    open = uiState.detail ? true : false;
    state = constants.onboarding.detailCellMemory;
  } else if (cookiesState.intro === 'detailCellGates') {
    open = uiState.detail ? true : false;
    state = constants.onboarding.detailCellGates;
  } else if (cookiesState.intro === 'detailProcess') {
    open = true && (networkState.iteration > 1);
    state = constants.onboarding.detailProcess;
  } else if (cookiesState.intro === 'headingExplanation') {
    open = true && timer;
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
 * @param {object} actions the actions that the component can take
 * @param {object} props the props that the component currently has
 */
export function getNextIntroState(introState, cookiesState, actions, props) {
  let newIntroState = introState;
  if (introState === '' || introState === undefined) {
    newIntroState = 'network';
  } else if (introState === 'contrast') {
    newIntroState = 'input';
  } else if (introState === 'input') {
    newIntroState = 'cellTransition';
  } else if (introState === 'network') {
    newIntroState = 'sliders';
  } else if (introState === 'sliders') {
    newIntroState = 'slidersExplained';
  } else if (introState === 'slidersExplained') {
    newIntroState = 'lowLR';
    prepareLowLRState(actions, props);
  } else if (introState === 'lowLR') {
    newIntroState = 'highLR';
    prepareHighLRState(actions, props);
  } else if (introState === 'highLR') {
    newIntroState = 'medLR';
    prepareMedLRState(actions, props);
  } else if (introState === 'medLR') {
    newIntroState = 'lowBS';
    prepareLowBSState(actions, props);
  } else if (introState === 'lowBS') {
    newIntroState = 'highBS';
    prepareHighBSState(actions, props);
  } else if (introState === 'highBS') {
    newIntroState = 'medBS';
    prepareMedBSState(actions, props);
  } else if (introState === 'medBS') {
    newIntroState = 'noNoise';
    prepareNoNoiseState(actions, props);
  } else if (introState === 'noNoise') {
    newIntroState = 'medNoise';
    prepareMedNoiseState(actions, props);
  } else if (introState === 'medNoise') {
    newIntroState = 'highNoise';
    prepareHighNoiseState(actions, props);
  } else if (introState === 'highNoise') {
    actions.reinitNetwork();
    newIntroState = 'startTraining';
  } else if (introState === 'startTraining') {
    actions.updateTraining({...props.training, running: true});
    newIntroState = 'detailProcess';
  } else if (introState === 'output') {
    newIntroState = 'contrast';
  } else if (introState === 'cellTransition') {
    actions.updateUI({...props.ui, detail: true, anim: props.training.running});
    actions.stopTraining(props.training);
    timer = false;
    setTimeout(() => timer = true, 3000);
    newIntroState = 'detailCell';
  } else if (introState === 'detailCell') {
    newIntroState = 'detailCellMemory';
  } else if (introState === 'detailCellMemory') {
    newIntroState = 'detailCellGates';
  } else if (introState === 'detailCellGates') {
    newIntroState = 'detailOutput';
    timer = false;
    setTimeout(() => timer = true, 30000);
  } else if (introState === 'detailOutput') {
    newIntroState = 'headingExplanation';
    timer = false;
    setTimeout(() => timer = true, 5000);
  } else if (introState === 'detailProcess') {
    newIntroState = 'output';
  } else {
    newIntroState = 'done';
  }
  Cookies.setIntroState(newIntroState);
  actions.updateCookiesState({...cookiesState, intro: newIntroState});
}

/**
 * Prepares the state for low learning rate explanation.
 *
 * @param {object} actions the actions that can be taken to update the state
 * @param {object} props the props of the component to trigger this change
 */
function prepareLowLRState(actions, props) {
  actions.updateTraining({...props.training, noise: 0, batchSize: 25});
  actions.updateNetwork({...props.network, iteration: 19,
    learningRate: 0.0001});
  actions.updatePretrained({...props.pretrained, model: 'low_lr_20'});
}

/**
 * Prepares the state for high learning rate explanation.
 *
 * @param {object} actions the actions that can be taken to update the state
 * @param {object} props the props of the component to trigger this change
 */
function prepareHighLRState(actions, props) {
  actions.updateTraining({...props.training, noise: 0, batchSize: 25});
  actions.updateNetwork({...props.network, iteration: 19, learningRate: 1});
  actions.updatePretrained({...props.pretrained, model: 'high_lr_20'});
}

/**
 * Prepares the state for medium learning rate explanation.
 *
 * @param {object} actions the actions that can be taken to update the state
 * @param {object} props the props of the component to trigger this change
 */
function prepareMedLRState(actions, props) {
  actions.updateTraining({...props.training, noise: 0, batchSize: 25});
  actions.updateNetwork({...props.network, iteration: 9, learningRate: 0.01});
  actions.updatePretrained({...props.pretrained, model: 'med_lr_10'});
}

/**
 * Prepares the state for low batch size  explanation.
 *
 * @param {object} actions the actions that can be taken to update the state
 * @param {object} props the props of the component to trigger this change
 */
function prepareLowBSState(actions, props) {
  actions.updateTraining({...props.training, noise: 0, batchSize: 5});
  actions.updateNetwork({...props.network, iteration: 9, learningRate: 0.025});
  actions.updatePretrained({...props.pretrained, model: 'low_bs_10'});
}

/**
 * Prepares the state for high batch size explanation.
 *
 * @param {object} actions the actions that can be taken to update the state
 * @param {object} props the props of the component to trigger this change
 */
function prepareHighBSState(actions, props) {
  actions.updateTraining({...props.training, noise: 0, batchSize: 50});
  actions.updateNetwork({...props.network, iteration: 9, learningRate: 0.025});
  actions.updatePretrained({...props.pretrained, model: 'high_bs_10'});
}

/**
 * Prepares the state for medium batch size explanation.
 *
 * @param {object} actions the actions that can be taken to update the state
 * @param {object} props the props of the component to trigger this change
 */
function prepareMedBSState(actions, props) {
  actions.updateTraining({...props.training, noise: 0, batchSize: 25});
  actions.updateNetwork({...props.network, iteration: 9, learningRate: 0.025});
  actions.updatePretrained({...props.pretrained, model: 'med_bs_10'});
}

/**
 * Prepares the state for no noise explanation.
 *
 * @param {object} actions the actions that can be taken to update the state
 * @param {object} props the props of the component to trigger this change
 */
function prepareNoNoiseState(actions, props) {
  actions.updateTraining({...props.training, batchSize: 25, noise: 0});
  actions.updateNetwork({...props.network, iteration: 9, learningRate: 0.025});
  actions.updatePretrained({...props.pretrained, model: 'no_noise_10'});
}

/**
 * Prepares the state for medium noise explanation.
 *
 * @param {object} actions the actions that can be taken to update the state
 * @param {object} props the props of the component to trigger this change
 */
function prepareMedNoiseState(actions, props) {
  actions.updateTraining({...props.training, batchSize: 25, noise: 0.2});
  actions.updateNetwork({...props.network, iteration: 19, learningRate: 0.025});
  actions.updatePretrained({...props.pretrained, model: 'med_noise_20'});
}

/**
 * Prepares the state for high noise explanation.
 *
 * @param {object} actions the actions that can be taken to update the state
 * @param {object} props the props of the component to trigger this change
 */
function prepareHighNoiseState(actions, props) {
  actions.updateTraining({...props.training, batchSize: 25, noise: 0.4});
  actions.updateNetwork({...props.network, iteration: 19, learningRate: 0.025});
  actions.updatePretrained({...props.pretrained, model: 'high_noise_20'});
}
