import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Grid, Paper, Typography, Slider, Tooltip} from '@material-ui/core';
import {grey} from '@material-ui/core/colors';
import {withStyles} from '@material-ui/core/styles';
import * as actions from '../../../actions';
import styles from '../../../styles/themedStyles';
import global from '../../constants/global';


/**
 * Controls at bottom of the Application
 */
class OutputPanel extends React.Component {
  /**
   * Handles the interaction with the sliders
   *
   * @memberof Input
   *
   * @param {number} sliderId - the id of the changed slider
   * @param {number} value - the new value of the learning rate
   */
  handleSliderChange = (sliderId, value) => {
    console.log('HELPPPP', sliderId, value);
    switch (sliderId) {
      case global.sliders[0].key:
        this.props.actions.updateNetwork({
          ...this.props.network,
          learningRate: value,
        });
        break;
      case global.sliders[1].key:
        this.props.actions.updateTraining({
          ...this.props.training,
          noise: value,
        });
        break;
      case global.sliders[2].key:
        this.props.actions.updateTraining({
          ...this.props.training,
          batchSize: value,
        });
        break;
      default:
    }
  }

  /**
   * Readt render function controlling the look of the
   * AppBar of the Application
   *
   * @return {object} the react components rendered look
   */
  render() {
    return (
      <Grid id="outpan" container item xs={4} justify='center'>
        <Paper className={this.props.classes.panelOv}>
          <Grid container xs={12} alignItems='center'>
            <Grid container justify='center'>
              {
                global.sliders.map((slider) => (
                  <Grid item key={slider.key} xs={12} style={{margin: '10px'}}>
                    <Typography variant="body1"
                      className={!this.props.ui.detail &&
                    !this.props.training.running ?
                    this.props.classes.typoOv : this.props.classes.typoOvOff
                      }
                      align='left'
                    >
                      {slider.title}
                    </Typography>
                    <DefaultSlider
                      className={this.props.classes.defSlider}
                      marks={slider.marks}
                      disabled={
                        this.props.ui.detail || this.props.training.running
                      }
                      defaultValue={
                        slider.key === 0 ? this.props.network.learningRate :
                        (slider.key === 1 ? this.props.training.noise :
                          this.props.training.batchSize)
                      }
                      valueLabelDisplay="auto"
                      ValueLabelComponent={ValueLabelComponent}
                      step={slider.step}
                      min={slider.min}
                      max={slider.max}
                      onChange={
                        (event, value) =>
                          this.handleSliderChange(slider.key, value)
                      }
                    />
                  </Grid>
                ))
              }
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

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
    withStyles(styles)(OutputPanel)
);
