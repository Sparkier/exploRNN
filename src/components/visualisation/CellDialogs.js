import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions';
import globalConstants from '../constants/global';
import {Dialog, DialogTitle, DialogContent} from '@material-ui/core';
import {Typography} from '@material-ui/core';

/**
 * This class handles the initialization and updating of the drawing
 * canvas(-es), that implement the animation and interaction with the
 * network itself
 */
class CellDialogs extends React.Component {
  /**
   *
   */
  handleClose() {
    this.props.actions.updateAppState({
      ...this.props.appState,
      cellDialog: [false, false, false, false, false, false],
    });
  }
  /**
   * Creates a placeholder div component for the canvas to be put in
   *
   * @return {object} the rendered div for the sketch canvas
   */
  render() {
    const global = globalConstants[this.props.appState.language];
    return (
      <div>
        <Dialog onClose={() => this.handleClose()}
          open={this.props.appState.cellDialog[0]}>
          <DialogTitle>
            {global.strings.lstmGates[0].title}
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              {global.strings.lstmGates[0].description}
            </Typography>
          </DialogContent>
        </Dialog>
        <Dialog onClose={() => this.handleClose()}
          open={this.props.appState.cellDialog[1]}>
          <DialogTitle>
            {global.strings.lstmGates[1].title}
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              {global.strings.lstmGates[1].description}
            </Typography>
          </DialogContent>
        </Dialog>
        <Dialog onClose={() => this.handleClose()}
          open={this.props.appState.cellDialog[2]}>
          <DialogTitle>
            {global.strings.lstmGates[2].title}
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              {global.strings.lstmGates[2].description}
            </Typography>
          </DialogContent>
        </Dialog>
        <Dialog onClose={() => this.handleClose()}
          open={this.props.appState.cellDialog[3]}>
          <DialogTitle>
            {global.strings.lstmGates[3].title}
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              {global.strings.lstmGates[3].description}
            </Typography>
          </DialogContent>
        </Dialog>
        <Dialog onClose={() => this.handleClose()}
          open={this.props.appState.cellDialog[4]}>
          <DialogTitle>
            {global.strings.lstmGates[4].title}
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              {global.strings.lstmGates[4].description}
            </Typography>
          </DialogContent>
        </Dialog>
        <Dialog onClose={() => this.handleClose()}
          open={this.props.appState.cellDialog[5]}>
          <DialogTitle>
            {global.strings.lstmGates[5].title}
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              {global.strings.lstmGates[5].description}
            </Typography>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

CellDialogs.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CellDialogs);
