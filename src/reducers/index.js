// Import all Reducers
import {combineReducers} from 'redux';
import training from './TrainingReducer';
import network from './NetworkReducer';
import ui from './UIReducer';
import appState from './AppStateReducer';

// Combine all Reducers
export default combineReducers({
  network,
  training,
  ui,
  appState,
});
