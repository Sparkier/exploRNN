import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';
import {Grid, Paper} from '@material-ui/core';
import {lightBlue, grey} from '@material-ui/core/colors';
import Slider from '@material-ui/core/Slider';
import {Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';

/**
 * Controls at bottom of the Application
 */
class InputPanel extends React.Component {
  /**
   * The constructor for the Input Panel class
   */
  constructor() {
    super();
    this.fontSize = 20;
    this.data = ['saw', 'sin', 'sqr', 'sinc'];
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
   * @param {object} event - the percentage of noise
   * @param {number} value - the percentage of noise
   */
  changeNoise = (event, value) => {
    const newNoise = value;
    this.props.actions.updateTraining({
      ...this.props.training,
      noise: newNoise,
    });
  }

  /**
   * Change the noise used in the training process.
   *
   * @memberof Input
   *
   * @param {object} event - the percentage of noise
   * @param {number} value - the percentage of noise
   */
  changeBatchSize = (event, value) => {
    this.props.actions.updateTraining({
      ...this.props.training,
      batchSize: value,
    });
  }

  // Some styles for better looks, TODO: clean up
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

  /**
   * Readt render function controlling the look of the
   * AppBar of the Application
   *
   * @return {object} the react components rendered look
   */
  render() {
    return (
      <Grid container item
        xs={4}
        justify='center'>
        <Paper style={{...this.myPadding, height: '100%', width: '80%'}}>
          <Grid container item justify='center' alignItems="center">
            <Typography variant="body1"
              style={{
                ...this.sliderPaddingStyle,
                color: !this.props.ui.detail &&
                  !this.props.training.running ?
                  lightBlue[400] : grey[500],
              }}>
              <Box fontWeight="fontWeightBold"
                fontSize={this.fontSize} m={1}>
                Noise:
              </Box>
              {this.props.training.noise} %
            </Typography>
            <Slider
              style={{...this.sliderPaddingStyle, color: 'white'}}
              marks
              disabled={
                this.props.ui.detail || this.props.training.running
              }
              defaultValue={this.props.training.noise}
              valueLabelDisplay="off"
              step={0.1}
              min={0}
              max={100} onChange={this.changeNoise}
            />
          </Grid>
          <Grid container item justify='center' alignItems="center">
            <Typography variant="body1"
              style={{
                ...this.sliderPaddingStyle,
                color: !this.props.ui.detail &&
                  !this.props.training.running ?
                  lightBlue[400] : grey[500],
              }}>
              <Box fontWeight="fontWeightBold"
                fontSize={this.fontSize} m={1}>
                 Batch Size:
              </Box>
              {this.props.training.batchSize}
            </Typography>
            <Slider
              style={{...this.sliderPaddingStyle, color: 'white'}}
              marks
              disabled={
                this.props.ui.detail || this.props.training.running
              }
              defaultValue={this.props.training.batchSize}
              valueLabelDisplay="off"
              step={1}
              min={1}
              max={50} onChange={this.changeBatchSize}
            />
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

// Controls state of the Application
InputPanel.propTypes = {
  training: PropTypes.object.isRequired,
  network: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(InputPanel);
