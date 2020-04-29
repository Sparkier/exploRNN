import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import {Grid, Typography, Slider, Tooltip, Link} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

import * as actions from '../../../actions';
import styles from '../../../styles/themedStyles';
import globalConstants from '../../constants/global';
import ComplexDialog from '../../dialogs/ComplexDialog';

/**
 * Slider input panel for the training parameters at bottom of the Application
 */
class SliderPanel extends React.Component {
  /**
   * Handles the interaction with the sliders
   *
   * @param {number} sliderId the id of the changed slider
   * @param {number} value the new value of the learning rate
   */
  handleSliderChange = (sliderId, value) => {
    const global = globalConstants[this.props.appState.language];
    switch (sliderId) {
      case global.sliders[0].key:
        this.props.actions.updateNetwork({
          ...this.props.network,
          learningRate: (Math.pow(10, value) / 10),
        });
        break;
      case global.sliders[1].key:
        this.props.actions.updateTraining({
          ...this.props.training,
          batchSize: value,
        });
        break;
      case global.sliders[2].key:
        this.props.actions.updateTraining({
          ...this.props.training,
          noise: value,
        });
        break;
      default:
    }
  }

  /**
   * Is called when the user clicks on the name of a parameter in this panel,
   * opens a corresponding dialog
   *
   * @param {number} id the id of the training parameter
   */
  onClick(id) {
    const dialog = this.props.appState.sliderDialog;
    dialog[id] = !dialog[id];
    this.props.actions.updateAppState({
      ...this.props.appState,
      sliderDialog: dialog,
    });
  }

  /**
   * Handles the closing of the dialogs for this element, updates the
   * global state accordingly
   */
  handleClose = () => {
    this.props.actions.updateAppState({
      ...this.props.appState,
      sliderDialog: [false, false, false],
    });
  }

  /**
   * Formats the value x to be of only necessary length
   *
   * @param {number} x the slider value
   * @return {string} a truncated version of x
   */
  getFormattedValue(x) {
    const actual = Math.pow(10, x) / 10;
    const log = Math.floor(x);
    const sol = actual.toFixed(Math.abs(log - 2));
    return sol;
  }

  /**
   * React render function controlling the look of the
   * slider panel of the Application
   *
   * @return {object} the react components rendered form
   */
  render() {
    const global = globalConstants[this.props.appState.language];
    // Check the sliders, we cant add noise to text
    const sliders = [];
    for (const slider of global.sliders) {
      if (slider.title !== global.sliders[2].title ||
        this.props.training.inputType !== 'Text Data') {
        sliders.push(slider);
      }
    }
    return (
      <Grid item xs className={this.props.classes.smallPanelWrapper}>
        <Grid container style={{height: '100%'}} direcion='column'
          justify='space-between' alignItems="center">
          {
            sliders.map((slider) => (
              <Grid item key={slider.key}
                className={this.props.classes.fullWidth}>
                <Typography align='left'>
                  <Link href={'#'} onClick={() => this.onClick(slider.key)}
                    className={this.props.ui.detail ?
                      this.props.classes.typoCv :
                        !this.props.training.running ?
                             this.props.classes.typoOv :
                             this.props.classes.typoOvOff
                    }>
                    {slider.title}
                  </Link>
                </Typography>
                <ComplexDialog closeFunction={this.handleClose}
                  open={this.props.appState.sliderDialog[slider.key]}
                  title={slider.title} description={slider.description} />
                <Slider
                  className={this.props.classes.defSlider}
                  marks={slider.marks}
                  disabled={
                    this.props.training.running
                  }
                  value={
                        slider.key === 0 ?
                        Math.log10(this.props.network.learningRate * 10):
                        (slider.key === 1 ? this.props.training.batchSize :
                          this.props.training.noise)
                  }
                  valueLabelDisplay="auto"
                  valueLabelFormat={(x) => slider.key === 0 ?
                        this.getFormattedValue(x) : x}
                  ValueLabelComponent={ValueLabelComponent}
                  step={slider.step}
                  min={slider.min}
                  max={slider.max}
                  onChange={
                    (event, value) =>
                      this.handleSliderChange(slider.key, value)
                  }/>
              </Grid>
            ))
          }
        </Grid>
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
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

// Controls state of the Application
SliderPanel.propTypes = {
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
    withStyles(styles)(SliderPanel)
);
