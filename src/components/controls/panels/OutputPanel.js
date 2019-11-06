import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';
import {Grid, Paper} from '@material-ui/core';
import {lightBlue, grey} from '@material-ui/core/colors';
import {Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';

/**
 * Controls at bottom of the Application
 */
class OutputPanel extends React.Component {
  
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
      <Grid container item xs={4} justify='center'>
        <Paper style={{...this.myPadding, width: '80%'}}>
          <Grid item>
            <Typography variant="body1"
              style={{
                ...this.sliderPaddingStyle,
                color: !this.props.ui.detail &&
                  !this.props.training.running ?
                  lightBlue[400] : grey[500],
              }}>
              <Box fontWeight="fontWeightBold"
                fontSize={this.fontSize} m={1}>
                Learning Rate:
              </Box>
              {this.props.network.learningRate}
            </Typography>
            <Slider
              style={{...this.sliderPaddingStyle, color: 'white'}}
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
    );
  }
}

// Controls state of the Application
OutputPanel.propTypes = {
  training: PropTypes.object.isRequired,
  network: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(OutputPanel);
