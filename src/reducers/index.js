// Import all Reducers
import {combineReducers} from 'redux';
import alertSnack from './AlertSnackReducer';
import training from './TrainingReducer';
import firstcall from './FirstcallReducer';
import network from './NetworkReducer';
import ui from './UIReducer';
import appState from './AppStateReducer';

// Combine all Reducers
export default combineReducers({
  alertSnack,
  network,
  training,
  firstcall,
  ui,
  appState,
});
