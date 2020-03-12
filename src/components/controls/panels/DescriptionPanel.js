import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Paper, Typography, Link} from '@material-ui/core';
import {Dialog, DialogTitle, DialogContent} from '@material-ui/core';
import * as actions from '../../../actions';
import styles from '../../../styles/themedStyles';
import globalConstants from '../../constants/global';

/**
 * Descriptions at bottom of the Application, only visible in the cell view
 */
class DescriptionPanel extends React.Component {
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
  handleClose() {
    const dialogs = [false, false, false, false, false, false];
    this.props.actions.updateAppState({
      ...this.props.appState,
      stepDialog: dialogs,
    });
  }

  /**
   * React render function controlling the look of the
   * description panel of the Application
   *
   * @return {object} the react components rendered form
   */
  render() {
    const global = globalConstants[this.props.appState.language];
    return (
      <Grid item xs={4} className={this.props.classes.smallPanelWrapper}>
        <Paper className={this.props.classes.panel}>
          <Grid container style={{height: '100%'}} direcion='column'
            justify='space-between' alignItems="center">
            {
              global.strings.lstmSteps.map((step) => (
                <Grid container item alignContent='flex-start' xs={5}
                  key={step.id} className={this.props.classes.panelContent}>
                  <Grid item xs={12}>
                    <Typography align='left'>
                      <Link className = {step.id === this.props.ui.lstmStep &&
                        this.props.ui.state[0] ?
                      this.props.classes.typoCv : this.props.classes.typoCvOff}
                      href="#" onClick={(event) => this.onClick(step.id)}>
                        {step.id + ': ' + step.title}
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1"
                      className=
                        {this.props.classes.typoStd}
                      align='left' >
                      {step.description}
                    </Typography>
                  </Grid>
                  <Dialog onClose={() => this.handleClose()}
                    open={this.props.appState.stepDialog[step.id]}>
                    <DialogTitle>
                      {step.title}
                    </DialogTitle>
                    <DialogContent dividers>
                      <Typography gutterBottom>
                        {step.longDescription}
                      </Typography>
                    </DialogContent>
                  </Dialog>
                </Grid>
              ))
            }
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

// Controls state of the Application
DescriptionPanel.propTypes = {
  training: PropTypes.object.isRequired,
  network: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
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
    withStyles(styles)(DescriptionPanel)
);
