import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import networkSketch from './sketches/networkSketch';
import {Grid} from '@material-ui/core';

import * as actions from '../../actions';

/**
 * This class handles the initialization and updating of the drawing
 * canvas(-es), that implement the animation and interaction with the
 * network itself
 */
class P5VisualsWrapper extends React.Component {
  /**
   * The constructor function for the P5Wrapper, creates the necessary
   * sketches and sets the initial properties
   */
  constructor() {
    super();
    // eslint-disable-next-line new-cap
    this.networkSketch = new window.p5(networkSketch, 'networkDiv');
    this.networkSketch.props = this.props;
    this.updateValues = true;
  }

  /**
   * This method is called if the global properties have changed, it
   * then sends the new properties to the related canvas sketches
   *
   * @param {object} nextProps the new global properties
   * @return {boolean} true, if the component should update and rerender
   */
  shouldComponentUpdate(nextProps) {
    this.props = nextProps;
    this.networkSketch.props = nextProps;
    this.networkSketch.updateMemory();
    return false;
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
      <Grid container spacing ={0} direction="row" justify='center'>
        <Grid item xs={10}>
          <div id = "networkDiv"/>
        </Grid>
      </Grid>
    );
  }
}

P5VisualsWrapper.propTypes = {
  network: PropTypes.object.isRequired,
  training: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(P5VisualsWrapper);
