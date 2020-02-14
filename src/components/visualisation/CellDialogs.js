import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions';
import globalConstants from '../constants/global';
import {Dialog, DialogTitle, DialogContent} from '@material-ui/core';
import {Typography} from '@material-ui/core';
import {Node, Context} from 'react-mathjax2';

/**
 * This class is responsible for handling the dialogs corresponding to the
 * cell components in the detail view of the application
 */
class CellDialogs extends React.Component {
  /**
   * Handles the closing of a dialog and updates the global state accordingly
   */
  handleClose() {
    this.props.actions.updateAppState({
      ...this.props.appState,
      cellDialog: [false, false, false, false, false, false],
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
        <Dialog onClose={() => this.handleClose()}
          open={this.props.appState.cellDialog[0]}>
          <DialogTitle>
            {global.strings.lstmGates[0].title}
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              <Context input='tex'>
                <span>
                  {global.strings.lstmGates[0].description}
                  <Node>
                    {global.strings.lstmGates[0].formula}
                  </Node>
                  <Node>
                    {global.strings.lstmGates[0].formula2}
                  </Node>
                  <Node>
                    {global.strings.lstmGates[0].formula3}
                  </Node>
                  <Node>
                    {global.strings.lstmGates[0].formula4}
                  </Node>
                </span>
              </Context>
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
              <Context input='tex'>
                <span>
                  {global.strings.lstmGates[1].description}
                  <Node>
                    {global.strings.lstmGates[1].formula}
                  </Node>
                  <Node>
                    {global.strings.lstmGates[1].formula2}
                  </Node>
                  <Node>
                    {global.strings.lstmGates[1].formula3}
                  </Node>
                  <Node>
                    {global.strings.lstmGates[1].formula4}
                  </Node>
                </span>
              </Context>
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
              <Context input='tex'>
                <span>
                  {global.strings.lstmGates[2].description}
                  <Node>
                    {global.strings.lstmGates[2].formula}
                  </Node>
                  <Node>
                    {global.strings.lstmGates[2].formula2}
                  </Node>
                </span>
              </Context>
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
              <Context input='tex'>
                <span>
                  {global.strings.lstmGates[3].description}
                  <Node>
                    {global.strings.lstmGates[3].formula}
                  </Node>
                  <Node>
                    {global.strings.lstmGates[3].formula2}
                  </Node>
                  <Node>
                    {global.strings.lstmGates[3].formula3}
                  </Node>
                  <Node>
                    {global.strings.lstmGates[3].formula4}
                  </Node>
                </span>
              </Context>
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
              <Context input='tex'>
                <span>
                  {global.strings.lstmGates[4].description}
                  <Node>
                    {global.strings.lstmGates[4].formula}
                  </Node>
                </span>
              </Context>
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
              <Context input='tex'>
                <span>
                  {global.strings.lstmGates[5].description}
                  <Node>
                    {global.strings.lstmGates[5].formula}
                  </Node>
                </span>
              </Context>
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
