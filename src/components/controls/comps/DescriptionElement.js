import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import {Grid, Typography, Link} from '@material-ui/core';

import * as actions from '../../../actions';
import styles from '../../../styles/themedStyles';
import ComplexDialog from '../../dialogs/ComplexDialog';

/**
 * Description Elements at bottom of the Application in the cell view
 */
class DescriptionElement extends React.Component {
  /**
   * Is called when any of the description titles is clicked on, opens the
   * corresponding dialog
   *
   * @param {number} id the id of the clicked element
   */
  onClick(id) {
    const dialogs = this.props.appState.stepDialog;
    dialogs[id] = !dialogs[id];
    this.props.actions.updateAppState({
      ...this.props.appState,
      stepDialog: dialogs,
    });
  }

  /**
   * Handles the closing of the dialogs for this element, updates the
   * global state accordingly
   */
  handleClose = () => {
    const dialogs = [false, false, false, false];
    this.props.actions.updateAppState({
      ...this.props.appState,
      stepDialog: dialogs,
    });
  }

  /**
   * React render function controlling the look of the
   * description element
   *
   * @return {object} the react components rendered form
   */
  render() {
    return (
      <Grid item>
        <Typography align='left'>
          <Link className = {this.props.step.id === this.props.ui.lstmStep &&
              this.props.ui.state[0] ?
            this.props.classes.typoCv : this.props.classes.typoCvOff}
          href="#" onClick={(event) => this.onClick(this.props.step.id)}>
            {(this.props.step.id + 1) + ' ' + this.props.step.title}
          </Link>
        </Typography>
        <ComplexDialog closeFunction={this.handleClose}
          open={this.props.appState.stepDialog[this.props.step.id]}
          title={this.props.step.title}
          description={this.props.step.longDescription} />
      </Grid>
    );
  }
}

// Controls state of the Application
DescriptionElement.propTypes = {
  training: PropTypes.object.isRequired,
  network: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  step: PropTypes.object.isRequired,
};

/**
 * Map the states from redux to this property.
 *
 * @param {object} state - the global redux state.
 * @return {object} - the new props of this component.
 */
function mapStateToProps(state) {
  return {
    training: state.training,
    network: state.network,
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

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(DescriptionElement)
);
