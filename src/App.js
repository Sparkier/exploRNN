import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from './theme/globalTheme';
import AppRouter from './AppRouter';
import combinedReducers from './reducers';

// Create the Store using all the Reducers and applying the Middleware

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combinedReducers, composeEnhancers(
    applyMiddleware(thunk)
));


// Render the App
// The App provides the Store to the following components.
// Controls as well as Routed Content are rendered.
const App = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <div className='full' id='appDiv'>
        <CssBaseline />
        <AppRouter/>
      </div>
    </Provider>
  </MuiThemeProvider>
);

export default App;
