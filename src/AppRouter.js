import * as React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Main from './components/MainComponent';
import PDF from './components/PDFComponent';

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
        <Router basename="/explornn">
          <div className='full'>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/pdf" component={PDF} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default AppRouter;
