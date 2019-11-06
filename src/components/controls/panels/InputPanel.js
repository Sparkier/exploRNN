import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';
import MyButton from './StyledButton';
import {Grid, Paper} from '@material-ui/core';
import {lightBlue, grey} from '@material-ui/core/colors';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
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
   * @param {number} dir - the direction in which to change the noise.
   */
  changeNoise = (dir) => {
    const newNoise = (this.props.training.noise + dir + 3) % 3;
    this.props.actions.updateTraining({
      ...this.props.training,
      noise: newNoise,
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
                    <KeyboardArrowUpIcon fontSize="small"
                      style={{
                        color: 'white',
                      }} />
                  } />
              </Grid>
              <Grid item >
                <Typography
                  style={{
                    color: !this.props.ui.detail &&
                      !this.props.training.running ?
                      lightBlue[400] : grey[500],
                  }}>
                  <Box fontWeight="fontWeightRegular"
                    fontSize={this.fontSize - 2} m={1}>
                    Input
                  </Box>
                </Typography>
                <Typography
                  style={{
                    color: !this.props.ui.detail &&
                      !this.props.training.running ?
                      lightBlue[400] : grey[500],
                  }}>
                  <Box fontWeight="fontWeightRegular"
                    fontSize={this.fontSize - 2} m={1}>
                    Type: {this.props.training.dataType}
                  </Box>
                </Typography>
                <Typography
                  style={{
                    color: !this.props.ui.detail &&
                      !this.props.training.running ?
                      lightBlue[400] : grey[500],
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
