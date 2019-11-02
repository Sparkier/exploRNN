import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import * as actions from '../actions';

import CloseIcon from '@material-ui/icons/Close';
import {IconButton, Snackbar} from '@material-ui/core';

/**
 * AlertSnack component that can be used to display alert snacks in the app.
 */
class AlertSnack extends React.Component {

  /**
   * Handles an action that should lead to closing this alert.
   *
   * @memberof AlertSnack
   */
  handleClose = () => {
    this.props.actions.updateAlertSnack({open: false, message: ''});
  };

  /**
   * Creates the AlertSnack to be rendered.
   * @return {object} - the alert that is to be displayed.
   */
  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.props.alertSnack.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.props.alertSnack.message}</span>}
        action={[
          <IconButton key="close" aria-label="Close" 
            color="inherit" onClick={this.handleClose} >
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
 * Map the states from redux to this property.
 *
 * @param {object} state - the global redux state.
 * @param {object} ownProps - the properties of this component.
 * @return {object} - the new props of this component.
 */
function mapStateToProps(state, ownProps) {
  return {
    alertSnack: state.alertSnack,
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

export default connect(mapStateToProps, mapDispatchToProps)(AlertSnack);
