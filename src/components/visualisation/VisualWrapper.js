import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import {Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

import styles from '../../styles/themedStyles';
import * as actions from '../../actions';
import CellDialogs from './dialogs/CellDialogs';
import HeadingDialogs from './dialogs/HeadingDialogs';
import networkSketch from './sketches/NetworkSketch';
import globalConstants from '../constants/global';

/**
 * This class handles the initialization and updating of the drawing
 * canvas(-es), that implement the animation and interaction with the
 * network itself
 */
class VisualWrapper extends React.Component {
  /**
   * The constructor function for the P5Wrapper, creates the necessary
   * sketches and sets the initial properties
   */
  constructor() {
    super();
    // eslint-disable-next-line new-cap
    this.networkSketch = new window.p5(networkSketch, 'networkDiv');
  }

  /**
   *  As soon as the component is mounted the sketches can be initialized
   */
  componentDidMount() {
    this.networkSketch.props = this.props;
    this.networkSketch.constants = globalConstants;
    this.networkSketch.updateMemory(false);
  }

  /**
   * This method is called if the global properties have changed, it
   * then sends the new properties to the related canvas sketches
   *
   * @param {object} prevProps the previous state before the update
   */
  componentDidUpdate(prevProps) {
    this.networkSketch.props = this.props;
    this.networkSketch.updateMemory(
        (prevProps.ui.running !== this.props.ui.running) &&
        this.props.ui.running);
    if (this.props.ui.reset) {
      this.networkSketch.reset();
      this.props.actions.updateUI({...this.props.ui, reset: false});
    }
  }

  /**
   * This function will remove all active sketches if the component
   * is about to be unmounted
   */
  componentWillUnmount() {
    this.networkSketch.remove();
  }

  /**
   * Creates a placeholder div component for the canvas to be put in
   *
   * @return {object} the rendered div for the sketch canvas
   */
  render() {
    return (
      <Grid container direction="row" justify='space-between'>
        <Grid item xs={12}>
          <div id="networkDiv" style={{fontSize: '0'}}/>
        </Grid>
        <CellDialogs/>
        <HeadingDialogs/>
      </Grid>
    );
  }
}

VisualWrapper.propTypes = {
  network: PropTypes.object.isRequired,
  training: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  textData: PropTypes.object.isRequired,
};

/**
 * Map the states from redux to this property.
 *
 * @param {object} state - the global redux state.
 * @param {object} ownProps - the properties of this component.
 * @return {object} - the new props of this component.
 */
function mapStateToProps(state, ownProps) {
  return {
    network: state.network,
    training: state.training,
    ui: state.ui,
    appState: state.appState,
    textData: state.textData,
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
    withStyles(styles)(VisualWrapper)
);
