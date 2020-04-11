import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import {Dialog, DialogTitle} from '@material-ui/core';

import * as actions from '../../actions';
import WelcomeDialogContent from './content/WelcomeDialogContent';
import OverviewDialogContent from './content/OverviewDialogContent';
import CellDialogContent from './content/CellDialogContent';

/**
 * Onboarding is used to explain the App.
 */
class Onboarding extends React.Component {
  /**
   * Renders the Onboarding Screen inside the App.
   *
   * @return {object} AlertSnack component to be rendered
   */
  render() {
    let dialogTitle = '';
    let open = false;
    let dialogContent = '';
    if (this.props.cookiesState.intro === '') {
      dialogTitle = 'Welcome to exploRNN!';
      open = this.props.ui.detail ? false : true;
      dialogContent = <WelcomeDialogContent/>;
    } else if (this.props.cookiesState.intro === 'overview') {
      dialogTitle = 'Network Overview';
      open = this.props.ui.detail ? false : true;
      dialogContent = <OverviewDialogContent/>;
    } else if (this.props.cookiesState.intro === 'detail') {
      dialogTitle = 'Cell Inspection';
      open = this.props.ui.detail ? true : false;
      dialogContent = <CellDialogContent/>;
    }
    return (
      <Dialog open={open}>
        <DialogTitle>
          {dialogTitle}
        </DialogTitle>
        {dialogContent}
      </Dialog>
    );
  }
}

// Prop Types holding all the Preferences
Onboarding.propTypes = {
  cookiesState: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

/**
 * Map the State to the Properties of this Component
 *
 * @param {object} state the state that is to be mapped to this component
 * @param {object} _ the props of this component
 * @return {object} the props that this component holds
 */
function mapStateToProps(state, _) {
  return {
    cookiesState: state.cookiesState,
    ui: state.ui,
  };
}

/**
 * Map the actions of the State to the Props of this Class
 *
 * @param {object} dispatch the function that is used to call actions
 * @return {object} the actions that this component can call
 */
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
