import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../actions';
import {Grid} from '@material-ui/core';
import AlertSnack from './AlertSnack';
import Training from './training/Training';
import P5VisualsWrapper from './p5Wrappers/P5VisualsWrapper';
import Input from '../components/controls/InputComponent';

/**
 * Main component of the Application that displays all content dependant on the
 * Controls State.
 */
class Main extends React.Component {
  /**
   * Render the Main Content and call other Elements.
   *
   * @return {object} - the main component to be rendered.
   */
  render() {
    return (
      <Grid container direction='row' className='mainGrid'>
        <Grid item xs className='full'>
          <Training/>
          <P5VisualsWrapper/>
          <Input/>
        </Grid>
        <AlertSnack />
      </Grid>
    );
  }
}

Main.propTypes = {
  network: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
