import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Context} from 'react-mathjax2';

import {Dialog, DialogTitle, DialogContent} from '@material-ui/core';
import {Typography} from '@material-ui/core';

import * as actions from '../../../actions';
import globalConstants from '../../constants/global';

/**
 * This class is responsible for handling the dialogs corresponding to the
 * cell components in the detail view of the application
 */
class HeadingDialogs extends React.Component {
  /**
   * Handles the closing of a dialog and updates the global state accordingly
   */
  handleClose() {
    this.props.actions.updateAppState({
      ...this.props.appState,
      headingDialog: '',
    });
  }

  /**
   * Creates all necessary dialog components that can later be shown when
   * interacting with the cell view elements
   *
   * @return {object} the rendered react component
   */
  render() {
    const global = globalConstants[this.props.appState.language];
    return (
      <div>
        {
          global.strings.headings.map((heading) => (
            <Dialog onClose={() => this.handleClose()}
              open={this.props.appState.headingDialog === heading.identifier}
              key={heading.id}>
              <DialogTitle>
                {heading.title}
              </DialogTitle>
              <DialogContent dividers>
                <Typography gutterBottom>
                  <Context input='tex'>
                    <span>
                      {heading.description}
                    </span>
                  </Context>
                </Typography>
              </DialogContent>
            </Dialog>
          ))
        }
      </div>
    );
  }
}

HeadingDialogs.propTypes = {
  network: PropTypes.object.isRequired,
  training: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
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
    network: state.network,
    training: state.training,
    ui: state.ui,
    appState: state.appState,
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

export default connect(mapStateToProps, mapDispatchToProps)(HeadingDialogs);
