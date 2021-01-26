import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import {Grid} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

import * as actions from '../actions';
import styles from '../styles/themedStyles';
import Training from './training/Training';
import VisualWrapper from './visualisation/VisualWrapper';
import BottomPanel from './controls/BottomComponent';
import AlertSnack from './AlertSnack';
import OnboardingDialog from './dialogs/OnboardingDialog';
import * as Cookies from '../helpers/Cookies';
import TopBar from './controls/TopBarComponent';
import Toolbar from '@material-ui/core/Toolbar';

/**
 * Main component of the Application that displays all content dependant on the
 * Controls State.
 */
class Main extends React.Component {
  /**
   * Constructing the Main app Comopnent and Initializing the Tutorial State.
   *
   * @param {object} props how this component will be generated
   */
  constructor(props) {
    super(props);
    const introState = Cookies.getIntroState();
    if (introState !== undefined) {
      this.props.actions.updateCookiesState({...this.props.cookiesState,
        intro: introState});
    }
  }

  /**
   * Render the Main Content and call other Elements.
   *
   * @return {object} - the main component to be rendered.
   */
  render() {
    return (
      <div className='full'>
        <header>
          <TopBar/>
        </header>
        <div className='wrap'>
          <Toolbar></Toolbar>
          <div className='content' id='visDiv'>
            <Grid container className='mainGrid' style={{height: '100%'}}>
              <Grid item className={this.props.classes.fullWidth} id='netArea'>
                <Training/>
                <VisualWrapper/>
              </Grid>
              <Grid item className={this.props.classes.panelWrapper}>
                <Divider/>
                <BottomPanel/>
              </Grid>
              <AlertSnack/>
              <OnboardingDialog/>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  network: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  cookiesState: PropTypes.object.isRequired,
};

/**
 * Map the states from redux to this property.
 *
 * @param {object} state - the global redux state.
 * @param {object} ownProps - the properties of this component.
 * @return {object} - the new props of this component.
 */
function mapStateToProps(state, ownProps) {
  return {
    network: state.network,
    cookiesState: state.cookiesState,
  };
}

/**
 * Maps the actions to this property.
 *
 * @param {function} dispatch - the function that is used to call an action.
 * @return {object} - the actions that can be used in this component.
 */
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(Main)
);
