// Import all Reducers
import {combineReducers} from 'redux';
import training from './TrainingReducer';
import network from './NetworkReducer';
import ui from './UIReducer';
import appState from './AppStateReducer';
import alertSnack from './AlertSnackReducer';

// Combine all Reducers
export default combineReducers({
  network,
  training,
  ui,
  appState,
  alertSnack,
});
