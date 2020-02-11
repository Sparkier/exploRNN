import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Grid, Paper, Typography, Link} from '@material-ui/core';
import {Dialog, DialogTitle, DialogContent} from '@material-ui/core';
import Start from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Reset from '@material-ui/icons/Replay';
import SkipNext from '@material-ui/icons/SkipNext';
import {withStyles} from '@material-ui/core/styles';
import * as actions from '../../../actions';
import styles from '../../../styles/themedStyles';
import globalConstants from '../../constants/global';
import MyButton from '../comps/StyledButton';

/**
 * Controls at bottom of the application, allows user to control
 * the training process
 */
class ControlPanel extends React.Component {
  /**
   * Toggles wether the training of the network is currently
   * on or off
   *
   * @memberof Input
   */
  toggleTraining = () => {
    if (this.props.ui.detail) {
      this.props.actions.updateUI({
        ...this.props.ui,
        anim: !this.props.ui.anim,
      });
    } else {
      this.props.actions.toggleTraining(this.props.training);
    }
  }

  /**
   * Handles the interaction with the reset button, lets the network
   * know that it needs to be reset
   *
   * @memberof Input
   */
  resetButtonPressed = () => {
    this.props.actions.updateTraining({...this.props.training, reset: true});
  }

  /**
   * This function makes the training run for only one training step
   *
   * @memberof Input
   */
  nextStep = () => {
    if (this.props.ui.detail) {
      this.props.actions.updateUI({...this.props.ui, animStep: true});
    } else {
      this.props.actions.updateTraining({...this.props.training, step: true});
    }
  }

  /**
   * Creates a formatted string representation of the number
   * of epochs, always having the same amount of characters
   *
   * @return {string} the formatted epoch number
   */
  styledEpochs() {
    let num = this.props.network.iteration;
    let out = '';
    let buff = 0;
    for (let i = 0; i < 6; i++) {
      if (i !== 0 && i % 3 === 0) {
        out = ',' + out;
      }
      buff = num % 10;
      out = buff + out;
      num = (num - buff) / 10;
    }
    return out;
  }

  /**
   * Gets called if the user interacts with the epoch title and opens the
   * corresponding dialog
   */
  onClick() {
    let dialog = this.props.appState.epochDialog;
    dialog = !dialog;
    this.props.actions.updateAppState({
      ...this.props.appState,
      epochDialog: dialog,
    });
  }

  /**
   * Handles the closing of the epoch dialog
   */
  handleClose() {
    this.props.actions.updateAppState({
      ...this.props.appState,
      epochDialog: false,
    });
  }

  /**
   * React render function controlling the look of the
   * control element of the Application
   *
   * @return {object} the react components rendered form
   */
  render() {
    const {classes} = this.props;
    const global = globalConstants[this.props.appState.language];
    return (
      <Grid container className={this.props.classes.panelWrapper}
        item xs={3} justify='center'
      >
        <Paper className={this.props.ui.detail ? classes.panelCv :
          classes.panelOv} >
          <Grid container style= {{height: '100%'}} justify='center'
            alignItems= 'center'>
            <Grid container justify='center'>
              <Grid container item xs={12} justify='center'>
                <Grid item>
                  <Typography
                    className =
                      {this.props.ui.detail ?
                        classes.typoCvBig : classes.typoOvBig
                      }
                  >
                    {global.strings.controlsTitle}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item className={this.props.classes.controlWrapper}
                justify='space-evenly' alignItems='center'
              >
                <Grid item>
                  <MyButton disabled={this.props.ui.detail ||
                      !this.props.training.workerReady}
                  properties={this.props}
                  action={this.resetButtonPressed}
                  icon={
                    <Reset fontSize="small" style={{color: 'white'}} />
                  } />
                </Grid>
                <Grid item>
                  <MyButton properties={this.props}
                    disabled = {!this.props.training.workerReady &&
                      !this.props.ui.netAnim}
                    action={this.toggleTraining}
                    icon={(this.props.ui.detail && this.props.ui.anim) ||
                      (!this.props.ui.detail && this.props.training.running) ?
                      <Pause fontSize="large" style={{color: 'white'}} /> :
                      <Start fontSize="large" style={{color: 'white'}} />
                    }>
                  </MyButton>
                </Grid>
                <Grid item>
                  <MyButton properties={this.props}
                    disabled={(this.props.ui.detail && this.props.ui.anim) ||
                    (!this.props.ui.detail && this.props.training.running) ||
                    !this.props.training.workerReady}
                    action={this.nextStep}
                    icon={
                      <SkipNext fontSize="small" style={{color: 'white'}}/>
                    } />
                </Grid>
              </Grid>
              <Grid container item xs={12} justify='center'>
                <Grid item>
                  <Typography>
                    <Link href={'#'} className =
                      {this.props.ui.detail ?
                        classes.typoCvBig : classes.typoOvBig}
                    onClick={() => this.onClick()}>
                      {global.strings.epoch.title}
                    </Link>
                  </Typography>
                  <Typography className={this.props.classes.typoStdBig}>
                    {this.styledEpochs()}
                  </Typography>
                  <Dialog onClose={() => this.handleClose()}
                    open={this.props.appState.epochDialog}>
                    <DialogTitle>
                      {global.strings.epoch.title}
                    </DialogTitle>
                    <DialogContent dividers>
                      <Typography gutterBottom>
                        {global.strings.epoch.description}
                      </Typography>
                    </DialogContent>
                  </Dialog>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

// Controls state of the Application
ControlPanel.propTypes = {
  training: PropTypes.object.isRequired,
  network: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
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
    withStyles(styles)(ControlPanel)
);
