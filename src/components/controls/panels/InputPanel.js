import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../../actions';
import {Grid, Paper} from '@material-ui/core';
import {lightBlue, grey} from '@material-ui/core/colors';
import {Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';

/**
 * Controls at bottom of the Application
 */
class InputPanel extends React.Component {
  /**
   * the constructor
   */
  constructor() {
    super();
    this.fontSizeTitle = 16;
    this.fontSizeText = 14;
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

  titlePaddingStyle = {
    paddingTop: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
    width: '100%',
  };

  descripionPaddingStyle = {
    width: '90%',
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
          <Grid item>
            <Typography variant="body1"
              style={{
                ...this.titlePaddingStyle,
                color: !this.props.ui.detail &&
                  !this.props.ui.ready &&
                  this.props.ui.trainingStep === 1?
                  lightBlue[500] : grey[400],
              }}
              align='left'
            >
              <Box fontWeight="fontWeightRegular"
                fontSize={this.fontSizeTitle} m={1}>
                Forward Prop
              </Box>
            </Typography>
            <Typography variant="body1"
              style={{
                ...this.descripionPaddingStyle,
                color: 'white',
              }}
              align='left'
            >
              <Box fontWeight="fontWeightRegular"
                fontSize={this.fontSizeText} m={1}>
                The Training Data is send through the network batch after batch
                and timestep after timestep to get a prediction
              </Box>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1"
              style={{
                ...this.titlePaddingStyle,
                color: !this.props.ui.detail &&
                  !this.props.ui.ready &&
                  this.props.ui.trainingStep === 2?
                  lightBlue[500] : grey[400],
              }}
              align='left'
            >
              <Box fontWeight="fontWeightRegular"
                fontSize={this.fontSizeTitle} m={1}>
                Validation
              </Box>
            </Typography>
            <Typography variant="body1"
              style={{
                ...this.descripionPaddingStyle,
                color: 'white',
              }}
              align='left'
            >
              <Box fontWeight="fontWeightRegular"
                fontSize={this.fontSizeText} m={1}>
                The prediction is compared to the real output values and a loss
                is calculated
              </Box>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1"
              style={{
                ...this.titlePaddingStyle,
                color: !this.props.ui.detail &&
                  !this.props.ui.ready &&
                  this.props.ui.trainingStep === 3?
                  lightBlue[500] : grey[400],
              }}
              align='left'
            >
              <Box fontWeight="fontWeightRegular"
                fontSize={this.fontSizeTitle} m={1}>
                Backprop
              </Box>
            </Typography>
            <Typography variant="body1"
              style={{
                ...this.descripionPaddingStyle,
                color: 'white',
              }}
              align='left'
            >
              <Box fontWeight="fontWeightRegular"
                fontSize={this.fontSizeText} m={1}>
                The loss is sent backward through the net so the weights of
                the cells can be adjusted for better predictions
              </Box>
            </Typography>
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
