import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import {Grid, Typography, Link} from '@material-ui/core';
import Start from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Reset from '@material-ui/icons/Replay';
import SkipNext from '@material-ui/icons/SkipNext';
import {withStyles} from '@material-ui/core/styles';

import styles from '../../../styles/themedStyles';
import * as actions from '../../../actions';
import globalConstants from '../../constants/global';
import StyledButton from '../comps/StyledButton';
import ComplexDialog from '../../dialogs/ComplexDialog';
import {getNextIntroState} from '../../../helpers/OnboardingState';

/**
 * Controls at bottom of the application, allows user to control
 * the training process
 */
class ControlPanel extends React.Component {
  /**
   * Toggles wether the training of the network is currently
   * on or off
   */
  toggleTraining = () => {
    if (this.props.ui.detail) {
      this.props.actions.updateUI({...this.props.ui,
        anim: !this.props.ui.anim});
    } else {
      this.props.actions.toggleTraining(this.props.training);
      if (this.props.cookiesState.intro === 'startTraining') {
        getNextIntroState(this.props.cookiesState.intro,
            this.props.cookiesState, this.props.actions.updateCookiesState);
      }
    }
  }

  /**
   * Handles the interaction with the reset button, lets the network
   * know that it needs to be reset
   */
  resetButtonPressed = () => {
    this.props.actions.updateTraining({...this.props.training, reset: true});
  }

  /**
   * This function makes the training run for only one training step
   */
  nextStep = () => {
    if (this.props.ui.detail) {
      this.props.actions.updateUI({...this.props.ui, animStep: true});
    } else {
      this.props.actions.updateTraining({...this.props.training, step: true});
    }
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
  handleClose = () => {
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
      <Grid className={this.props.classes.panelWrapper} item xs={2}>
        <Grid container style={{height: '100%'}} justify='center'
          alignItems='center'>
          <Grid container justify='center'>
            <Grid container item justify='center' alignItems='center'>
              <Grid item>
                <StyledButton disabled={this.props.ui.detail ||
                      !this.props.training.workerReady}
                properties={this.props}
                action={this.resetButtonPressed}
                icon={
                  <Reset fontSize="small" style={{color: 'white'}} />
                } />
              </Grid>
              <Grid item>
                <StyledButton properties={this.props}
                  disabled = {!this.props.training.workerReady &&
                      !this.props.ui.netAnim}
                  action={this.toggleTraining}
                  icon={(this.props.ui.detail && this.props.ui.anim) ||
                      (!this.props.ui.detail && this.props.training.running) ?
                      <Pause fontSize="large" style={{color: 'white'}} /> :
                      <Start fontSize="large" style={{color: 'white'}} />
                  }>
                </StyledButton>
              </Grid>
              <Grid item>
                <StyledButton properties={this.props}
                  disabled={(this.props.ui.detail && this.props.ui.anim) ||
                    (!this.props.ui.detail && this.props.training.running) ||
                    !this.props.training.workerReady}
                  action={this.nextStep}
                  icon={
                    <SkipNext fontSize="small" style={{color: 'white'}}/>
                  } />
              </Grid>
            </Grid>
            <Grid container item xs={12} alignItems='center' direction='column'>
              <Grid item>
                <Typography>
                  <Link href={'#'} className =
                    {this.props.ui.detail ?
                        classes.typoCvBig : classes.typoOvBig}
                  onClick={() => this.onClick()}>
                    {global.strings.epoch.title}
                  </Link>
                </Typography>
                <ComplexDialog closeFunction={this.handleClose}
                  open={this.props.appState.epochDialog}
                  title={global.strings.epoch.title}
                  description={global.strings.epoch.description}/>
              </Grid>
              <Grid item>
                <Typography className={this.props.classes.typoStdBig}>
                  {this.props.network.iteration}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
  cookiesState: PropTypes.object.isRequired,
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
    withStyles(styles)(ControlPanel)
);
