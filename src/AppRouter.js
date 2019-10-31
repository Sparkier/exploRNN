import * as React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';

import Main from './components/MainComponent';

/**
 * AppRouter Calling other Components dependant on Route.
 */
class AppRouter extends React.Component {
  /**
   * Renders the component for a route.
   *
   * @return {object} - the component to be rendered for this route.
   */
  render() {
    return (
      <div className='wrap'>
        <Toolbar/>
        <div className='content'>
          <Router>
            <div className='full'>
              <Route exact={true} path="" component={Main} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default AppRouter;
