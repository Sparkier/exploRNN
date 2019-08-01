// Import all Reducers
import { combineReducers } from 'redux';
import alertSnack from './AlertSnackReducer';
import iteration from './IterationReducer';
import prediction from './PredictionReducer';
import training from './TrainingReducer';

// Combine all Reducers
export default combineReducers({
    alertSnack,
    iteration,
    prediction,
    training
})
