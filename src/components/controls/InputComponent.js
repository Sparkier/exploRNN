import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {withStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
// import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select';
import {Grid, Paper} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Start from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Reset from '@material-ui/icons/Replay';
import SkipNext from '@material-ui/icons/SkipNext';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import * as actions from '../../actions';
import { lightBlue, grey, orange } from '@material-ui/core/colors';

/**
 * The current Component holding all the input elements to change the Network
 * for Training.
 */
class Input extends React.Component {
  /**
   * The constructor for the Input class
   */
  constructor() {
    super();
    this.fontSize = 20;
    this.data = ['saw', 'sin', 'sqr', 'sinc'];
  }

  /**
   * Handles the interaction with the learning rate slider
   *
   * @memberof Input
   *
   * @param {object} event - the direction in which to change the noise.
   * @param {number} value - the new value of the learning rate
   */
  handleSliderChange = (event, value) => {
    this.props.actions.updateNetwork({
      ...this.props.network,
      learningRate: value,
    });
  }

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
   * Change the type of data for the training input.
   *
   * @memberof Input
   *
   * @param {number} dir either 1 or -1 depending on which direction
   * the user has pressed
   */
  changeType = (dir) => {
    let i = 0;
    for (; i < this.data.length; i++) {
      if (this.data[i] === this.props.training.dataType) {
        break;
      }
    }
    i = (i + this.data.length + dir) % this.data.length;
    this.props.actions.updateTraining({
      ...this.props.training,
      dataType: this.data[i],
    });
  }

  /**
   * Change the noise used in the training process.
   *
   * @memberof Input
   *
   * @param {number} dir - the direction in which to change the noise.
   */
  changeNoise = (dir) => {
    const newNoise = (this.props.training.noise + dir + 3) % 3;
    this.props.actions.updateTraining({
      ...this.props.training,
      noise: newNoise,
    });
  }

  /**
   * creates a formatted string representation of the number
   * of epochs, always having the same string length
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

  simplePaddingStyle = {
    width: '90%',
    background: '#FFFFFF',
  };

  myPadding = {
    paddingTop: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingBottom: '20px',
    background: grey[800],
  };

  mySecondPadding = {
    background: grey[100],
  };

  buttonPadding = {
    paddingTop: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingBottom: '10px',
  }

  sliderPaddingStyle = {
    ...this.buttonPadding,
    width: '80%',
  };

  textStyle = {
    color: !this.props.ui.detail ? lightBlue[400] : orange[500],
  }

  /**
   * The render function for this react component
   *
   * @return {object} the rendered component
   */
  render() {
    return (
      <div id="valueDiv" align="center">
        <Grid container
          spacing={3}
          style={this.simplePaddingStyle}
          justify='center'>
          <Grid container item
            xs={4}
            justify='center'>
            <Paper style={{...this.myPadding, height: '100%', width: '80%'}}>
              <Grid container item justify='center' alignItems="center">
                <Grid item container
                  xs={2}
                  justify="center"
                  alignItems='center'>
                  <Grid item>
                    <MyButton
                      disabled={
                        this.props.ui.detail || this.props.training.running
                      }
                      properties={this.props}
                      action={(event) => this.changeType(-1)}
                      icon={
                        <ChevronLeftIcon fontSize="small" style={{
                          color: 'white',
                        }} />
                      } />
                  </Grid>
                </Grid>
                <Grid item container xs={3}
                  justify="center"
                  alignItems='center'
                  direction="column">
                  <Grid item>
                    <MyButton
                      disabled={
                        this.props.ui.detail || this.props.training.running
                      } properties={this.props}
                      action={(event) => this.changeNoise(1)}
                      icon={
                        <KeyboardArrowUpIcon fontSize="small" style={{
                          color: 'white',
                        }} />
                      } />
                  </Grid>
                  <Grid item >
                    <Typography
                      style={{
                        color: !this.props.ui.detail
                          && !this.props.training.running
                          ? lightBlue[400] : grey[500]
                      }}>
                      <Box fontWeight="fontWeightRegular"
                        fontSize={this.fontSize - 2} m={1}>
                        Input
                      </Box>
                    </Typography>
                    <Typography
                      style={{
                        color: !this.props.ui.detail
                          && !this.props.training.running
                          ? lightBlue[400] : grey[500]
                      }}>
                      <Box fontWeight="fontWeightRegular"
                        fontSize={this.fontSize - 2} m={1}>
                        Type: {this.props.training.dataType}
                      </Box>
                    </Typography>
                    <Typography
                      style={{
                        color: !this.props.ui.detail
                          && !this.props.training.running
                          ? lightBlue[400] : grey[500]
                      }}>
                      <Box fontWeight="fontWeightRegular"
                        fontSize={this.fontSize - 2} m={1}>
                        Noise: {this.props.training.noise}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <MyButton
                      disabled={
                        this.props.ui.detail || this.props.training.running
                      } properties={this.props}
                      action={(event) => this.changeNoise(-1)}
                      icon={
                        <KeyboardArrowDownIcon fontSize="small" style={{
                          color: 'white',
                        }} />
                      } />
                  </Grid>
                </Grid>
                <Grid item container xs={2} justify="center"
                  alignItems='center'>
                  <Grid item>
                    <MyButton
                      disabled={
                        this.props.ui.detail || this.props.training.running
                      } properties={this.props}
                      action={(event) => this.changeType(-1)}
                      icon={
                        <ChevronRightIcon fontSize="small" style={{
                          color: 'white',
                        }} />
                      } />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid container item xs={4} justify='center'>
            <Paper style={{...this.myPadding, width: '80%',}}>
              <Grid container item justify='center' alignItems="center">
                <Grid item style={this.myPadding}>
                  <MyButton disabled={this.props.ui.detail}
                    properties={this.props}
                    action={this.resetButtonPressed}
                    icon={
                      <Reset fontSize="medium" style={{color: 'white',}} />
                    } />
                </Grid>
                <Grid item style={this.myPadding}>
                  <MyButton properties={this.props}
                    action={this.toggleTraining}
                    icon={(this.props.ui.detail && this.props.ui.anim) ||
                      (!this.props.ui.detail && this.props.training.running)
                      ?
                      <Pause fontSize="large" style={{color: 'white',}} /> :
                      <Start fontSize="large" style={{color: 'white',}} />
                    }>
                  </MyButton>
                </Grid>
                <Grid item style={this.myPadding}>
                  <MyButton properties={this.props}
                    disabled={(this.props.ui.detail && this.props.ui.anim) ||
                    (!this.props.ui.detail && this.props.training.running)}
                    action={this.nextStep}
                    icon={
                      <SkipNext fontSize="medium" style={{color: 'white',}}/>
                    } />
                </Grid>
              </Grid>

              <Grid container item xs={12} justify='center'>
                <Grid item style={this.myPadding}>
                  <Typography 
                    style={{ 
                      color: !this.props.ui.detail 
                        ? lightBlue[400] : orange[500] 
                    }}>
                    <Box fontWeight="fontWeightBold" 
                      fontSize={this.fontSize} m={1}>
                      Epochs:
                    </Box>
                  </Typography>
                  <Typography style={{color: 'white',}}>
                    <Box fontSize={24} m={1}>
                      {this.styledEpochs()}
                    </Box>
                  </Typography>
                </Grid>
              </Grid>

            </Paper>
          </Grid>
          <Grid container item xs={4} justify='center'>
            <Paper style={{...this.myPadding, width: '80%'}}>
              <Grid item>
                <Typography variant="body1" 
                  style={{
                    ...this.sliderPaddingStyle,
                    color: !this.props.ui.detail
                      && !this.props.training.running
                      ? lightBlue[400] : grey[500],
                  }}>
                  <Box fontWeight="fontWeightBold" 
                    fontSize={this.fontSize} m={1}>
                    Learning Rate:
                  </Box>
                  {this.props.network.learningRate}
                </Typography>
                <Slider
                  style={{...this.sliderPaddingStyle, color: 'white',}}
                  marks
                  disabled={
                    this.props.ui.detail || this.props.training.running
                  }
                  defaultValue={this.props.network.learningRate}
                  valueLabelDisplay="off"
                  step={0.01}
                  min={0.01}
                  max={0.5} onChange={this.handleSliderChange}
                />
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
          </Grid>
        </Grid>
      </div>
    );
  }
}


const styles = {
  root: {
    border: 1,
    borderRadius: 3,
    color: 'white',
  },
  select_net: {
    '&:before': {
      borderColor: grey[500],
    },
    '&:after': {
      borderColor: lightBlue[500],
    },
    'width': '150px',
    'color': 'white',
  }, select_detail: {
    '&:before': {
      borderColor: grey[500],
    },
    '&:after': {
      borderColor: orange[500],
    },
    'width': '150px',
    'color': 'white',
  },
  disabled: {
    '&:before': {
      borderColor: grey[100],
    },
    '&:after': {
      borderColor: grey[100],
    },
    'width': '150px',
    'color': 'white',
  },
  button_cell: {
    'paddingLeft': '12px',
    'paddingRight': '12px',
    'color': 'white',
    'borderRadius': '50%',
    'background': orange[500],
    '&:hover': {
      background: orange[800],
    },
  }, button_net: {
    'paddingLeft': '12px',
    'paddingRight': '12px',
    'color': 'white',
    'borderRadius': '50%',
    'background': lightBlue[500],
    '&:hover': {
      background: lightBlue[800],
    },
  },
  icon: {
    fill: 'white',
  },
};

function StyledButtonRaw(props) {
  const { classes, properties, icon, action, disabled } = props;
  return (
    <IconButton disabled={disabled} variant="outlined" className={
      properties.ui.detail ? classes.button_cell : classes.button_net}
      onClick={action}>
      {icon}
    </IconButton>
  );
}

function StyledSelectRaw(props) {
  const { classes, color, label, properties, type, ...other } = props;
  return (
    <div style={{ display: 'inline-block', marginRight: '12px' }}>
      <Typography style={
        {
          color: !properties.ui.detail
          ? (type === 'net' ? lightBlue[500] : grey[500]) 
          : (type === 'net' ? grey[500] : orange[500]),
        }
      }>{label}</Typography>
      <Select variant="outlined" className={
        properties.ui.detail ?
          (type === 'net' ? classes.disabled : classes.select_detail) :
          (type === 'net' ? classes.select_net : classes.disabled)}
        inputProps={{
          classes: {
            icon: classes.icon,
          },
          disabled: properties.ui.detail === (type === 'net'),
          color: 'white',
        }} {...other} />
    </div>
  );
}

StyledSelectRaw.propTypes = {
  /**
     * Override or extend the styles applied to the component.
     */
  classes: PropTypes.object.isRequired,
};

StyledButtonRaw.propTypes = {
  /**
     * Override or extend the styles applied to the component.
     */
  classes: PropTypes.object.isRequired,
};

// const StyledSelect = withStyles(styles)(StyledSelectRaw);
const MyButton = withStyles(styles)(StyledButtonRaw);

// Controls state of the Application
Input.propTypes = {
  network: PropTypes.object.isRequired,
  training: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

// Mapping the Controls state to the Props of this Class
function mapStateToProps(state, ownProps) {
  return {
    network: state.network,
    training: state.training,
    ui: state.ui,
  };
}

// Map the Actions called when Controls are used to the Props of this Class
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);
