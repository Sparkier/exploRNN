import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import * as actions from '../actions';

import CloseIcon from '@material-ui/icons/Close';
import {IconButton, Snackbar} from '@material-ui/core';

/**
 * Alert Snack is used to communicate Messages inside the App.
 */
class AlertSnack extends React.Component {
  /**
   * Handle the closing of this Alert Popup.
   *
   * @param {object} event the event that triggered this function
   * @param {object} reason the reason for this event
   */
  handleClose = (event, reason) => {
    // This prevents a bug that causes immediate closing
    if (reason !== 'clickaway') {
      this.props.actions.updateAlertSnack({open: false, message: ''});
    }
  };

  /**
   * Renders the Alert inside the App.
   *
   * @return {object} AlertSnack component to be rendered
   */
  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={this.props.alertSnack.open}
        autoHideDuration={3000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.props.alertSnack.message}</span>}
        action={[
          <IconButton key="close" aria-label="Close" color="inherit"
            onClick={this.handleClose} >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

// Prop Types holding all the Preferences
AlertSnack.propTypes = {
  alertSnack: PropTypes.object.isRequired,
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
    alertSnack: state.alertSnack,
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

export default connect(mapStateToProps, mapDispatchToProps)(AlertSnack);
