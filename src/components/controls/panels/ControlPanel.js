import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';
import Start from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Reset from '@material-ui/icons/Replay';
import SkipNext from '@material-ui/icons/SkipNext';
import {Grid, Paper} from '@material-ui/core';
import {Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import MyButton from '../comps/StyledButton';
import {withStyles} from '@material-ui/core/styles';
import styles from '../../../styles/themedStyles';

/**
 * Controls at bottom of the Application
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
   * know that it needs be reset
   *
   * @memberof Input
   */
  resetButtonPressed = () => {
    this.props.actions.updateTraining({...this.props.training, reset: true});
  }

  /**
   * This function makes the training go on by only one training step
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
   * creates a formatted string representation of the number
   * of epochs, always having the same amount of characters
   *
   * @return {string} the formatted epoch number
   */
  styledEpochs() {
    let num = this.props.network.iteration;
    let out = '';
    let buff = 0;
    for (let i = 0; i < 9; i++) {
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
   * Readt render function controlling the look of the
   * AppBar of the Application
   *
   * @return {object} the react components rendered look
   */
  render() {
    const {classes} = this.props;
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
                      {this.props.ui.detail ? classes.typoCv : classes.typoOv}
                  >
                    <Box fontWeight="fontWeightRegular"
                      fontSize={24} m={1}>
                      Controls
                    </Box>
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item className={this.props.classes.controlWrapper}
                justify='space-evenly' alignItems='center'
              >
                <Grid item>
                  <MyButton disabled={this.props.ui.detail}
                    properties={this.props}
                    action={this.resetButtonPressed}
                    icon={
                      <Reset fontSize="small" style={{color: 'white'}} />
                    } />
                </Grid>
                <Grid item>
                  <MyButton properties={this.props}
                    disabled = {false}
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
                    (!this.props.ui.detail && this.props.training.running)}
                    action={this.nextStep}
                    icon={
                      <SkipNext fontSize="small" style={{color: 'white'}}/>
                    } />
                </Grid>
              </Grid>
              <Grid container item xs={12} justify='center'>
                <Grid item className={this.props.ui.detail ? classes.panelCv :
                  classes.panelOv}>
                  <Typography
                    className =
                      {this.props.ui.detail ? classes.typoCv : classes.typoOv}
                  >
                    <Box fontWeight="fontWeightRegular"
                      fontSize={this.fontSize} m={1}>
                      Epochs:
                    </Box>
                  </Typography>
                  <Typography style={{color: 'white'}}>
                    <Box fontSize={24} m={1}>
                      {this.styledEpochs()}
                    </Box>
                  </Typography>
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
  actions: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

/**
 * Mapping the Controls state to the Props of this Class
 *
 * @param {object} state ...
 * @return {object} ...
 */
function mapStateToProps(state) {
  return {
    training: state.training,
    network: state.network,
    ui: state.ui,
  };
}

/**
 * Map the Actions called when Controls are used to the Props of this Class
 *
 * @param {object} dispatch ...
 * @return {object} ...
 */
function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(ControlPanel)
);
