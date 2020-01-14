import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from './theme/globalTheme';
import AppRouter from './AppRouter';
import Controls from './components/controls/ControlsComponent';
import combinedReducers from './reducers';

// Create the Store using all the Reducers and applying the Middleware
const store = createStore(
    combinedReducers,
    applyMiddleware(thunk)
);


// Render the App
// The App provides the Store to the following components.
// Controls as well as Routed Content are rendered.
const App = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <div className='full'>
        <CssBaseline />
        <header>
          <Controls/>
        </header>
        <AppRouter/>
      </div>
    </Provider>
  </MuiThemeProvider>
);

export default App;
