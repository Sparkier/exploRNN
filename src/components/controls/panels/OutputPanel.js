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
import Tooltip from '@material-ui/core/Tooltip';
import {withStyles} from '@material-ui/core/styles';

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

  titlePaddingStyle = {
    ...this.buttonPadding,
    width: '100%',
  };

  defaultSliderStyle = {
    width: '80%',
    markerLabel: {
      color: lightBlue[500],
    },
  }

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
                ...this.titlePaddingStyle,
                color: !this.props.ui.detail &&
                  this.props.ui.ready ?
                  lightBlue[400] : grey[500],
              }}
              align='left'
            >
              <Box fontWeight="fontWeightRegular"
                fontSize={14} m={1}>
                Learning Rate [ ]
              </Box>
            </Typography>
            <DefaultSlider
              style={{...this.defaultSliderStyle, color: 'white'}}
              marks={learningRateMarks}
              disabled={
                this.props.ui.detail || this.props.training.running
              }
              defaultValue={this.props.network.learningRate}
              valueLabelDisplay="auto"
              ValueLabelComponent={ValueLabelComponent}
              step={0.005}
              min={0.01}
              max={0.25} onChange={this.handleSliderChange}
            />
          </Grid>
          <Grid container item justify='center' alignItems="center">
            <Typography variant="body1"
              style={{
                ...this.titlePaddingStyle,
                color: !this.props.ui.detail &&
                  this.props.ui.ready ?
                  lightBlue[400] : grey[500],
              }}
              align='left'
            >
              <Box fontWeight="fontWeightRegular"
                fontSize={14} m={1}>
                Noise [%]
              </Box>
            </Typography>
            <DefaultSlider
              style={{...this.defaultSliderStyle, color: 'white'}}
              marks = {noiseMarks}
              disabled={
                this.props.ui.detail || this.props.training.running
              }
              defaultValue={this.props.training.noise}
              valueLabelDisplay="auto"
              ValueLabelComponent={ValueLabelComponent}
              step={0.1}
              min={0}
              max={100} onChange={this.changeNoise}
            />
          </Grid>
          <Grid container item justify='center' alignItems="center">
            <Typography variant="body1"
              style={{
                ...this.titlePaddingStyle,
                color: !this.props.ui.detail &&
                  this.props.ui.ready ?
                  lightBlue[400] : grey[500],
              }}
              align='left'
            >
              <Box fontWeight="fontWeightRegular"
                fontSize={14} m={1}>
                 Batch Size [Data/Batch]
              </Box>
            </Typography>
            <DefaultSlider
              style={{...this.defaultSliderStyle, color: 'white'}}
              marks = {batchMarks}
              disabled={
                this.props.ui.detail || this.props.training.running
              }
              defaultValue={this.props.training.batchSize}
              valueLabelDisplay="auto"
              ValueLabelComponent={ValueLabelComponent}
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

const learningRateMarks = [
  {
    value: 0.01,
    label: 0.01,
  },
  {
    value: 0.125,
    label: 0.125,
  },
  {
    value: 0.25,
    label: 0.25,
  },
];


const noiseMarks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 50,
    label: '50%',
  },
  {
    value: 100,
    label: '100%',
  },
];


const batchMarks = [
  {
    value: 1,
    label: '1 d/b',
  },
  {
    value: 50,
    label: '50 d/b',
  },
];

/**
 * The Value Label for the sliders
 *
 * @param {object} props the properties of the label
 * @return {object} the rendering for the label
 */
function ValueLabelComponent(props) {
  const {children, open, value} = props;

  const popperRef = React.useRef(null);
  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.update();
    }
  });

  return (
    <LightTooltip
      PopperProps={{
        popperRef,
      }}
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={value}
    >
      {children}
    </LightTooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const DefaultSlider = withStyles((theme) => ({
  markLabel: {
    color: grey[500],
  },
  markLabelActive: {
    color: grey[200],
  },
}))(Slider);

// Controls state of the Application
OutputPanel.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(OutputPanel);
